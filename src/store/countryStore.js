import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCountryStore = create(
  persist(
    (set, get) => ({
      countries: [],
      filteredCountries: [],
      searchQuery: '',
      selectedRegion: '',
      isLoading: false,
      error: null,

      // Actions
      setCountries: (countries) => set({ countries, filteredCountries: countries }),
      setFilteredCountries: (filteredCountries) => set({ filteredCountries }),
      setSearchQuery: (searchQuery) => {
        set({ searchQuery })
        get().filterCountries()
      },
      setSelectedRegion: (selectedRegion) => {
        set({ selectedRegion })
        get().filterCountries()
      },
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),      // Fetch countries
      fetchCountries: async () => {
        const { countries } = get()
        if (countries.length > 0) return // Use cached data if available

        set({ isLoading: true, error: null })
        try {
          // Try to fetch from network
          const response = await fetch('https://restcountries.com/v3.1/all')
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const data = await response.json()
          
          // Validate data structure
          if (!Array.isArray(data)) {
            throw new Error('Invalid data format received')
          }
          set({ 
            countries: data,
            filteredCountries: data,
            isLoading: false
          })
        } catch (error) {
          console.error('Error fetching countries:', error)
          
          set({ 
            error: 'Unable to load countries. Please check your internet connection.',
            isLoading: false 
          })
        }
      },

      // Filter countries based on search query and region
      filterCountries: () => {
        const { countries, searchQuery, selectedRegion } = get()
        let filtered = [...countries]

        if (searchQuery) {
          filtered = filtered.filter(country =>
            country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }

        if (selectedRegion) {
          filtered = filtered.filter(country =>
            country.region.toLowerCase() === selectedRegion.toLowerCase()
          )
        }

        set({ filteredCountries: filtered })
      },

      // Get country by code
      getCountryByCode: (code) => {
        const { countries } = get()
        return countries.find(country => 
          country.cca3.toLowerCase() === code.toLowerCase()
        )
      },

      // Get border countries
      getBorderCountries: (borderCodes) => {
        const { countries } = get()
        if (!borderCodes) return []
        return countries.filter(country => 
          borderCodes.includes(country.cca3)
        )
      }
    }),
    {
      name: 'country-storage',
      getStorage: () => localStorage,
    }
  )
)

export default useCountryStore
