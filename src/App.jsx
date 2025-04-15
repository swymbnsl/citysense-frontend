import { useState, useEffect, useRef } from "react"
import { MapPin } from "lucide-react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import LandingPage from "./LandingPage"

// Main component
function HeatmapVisualization() {
  const mapContainer = useRef(null)
  const mapInstance = useRef(null)
  const layerGroups = useRef({})
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeMap, setActiveMap] = useState("pollution")
  const [heatmapData, setHeatmapData] = useState({
    pollution: [],
    potholes: [],
    hygiene: [],
    flooding: [],
  })

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setLocation(userLocation)
          generateRandomData(userLocation.lat, userLocation.lng)
          setLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          // Default location (New York City)
          const defaultLocation = { lat: 40.7128, lng: -74.006 }
          setLocation(defaultLocation)
          generateRandomData(defaultLocation.lat, defaultLocation.lng)
          setLoading(false)
        }
      )
    } else {
      // Geolocation not supported
      const defaultLocation = { lat: 40.7128, lng: -74.006 }
      setLocation(defaultLocation)
      generateRandomData(defaultLocation.lat, defaultLocation.lng)
      setLoading(false)
    }
  }, [])

  // Initialize map when location is available
  useEffect(() => {
    if (loading || !location || !mapContainer.current) return

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      // In a real implementation, we would use proper imports
      // This approach is for demonstration purposes
      if (!window.L) {
        // Create link elements for CSS
        const leafletCSS = document.createElement("link")
        leafletCSS.rel = "stylesheet"
        leafletCSS.href =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
        document.head.appendChild(leafletCSS)

        // Create script element for JS
        const script = document.createElement("script")
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"
        script.async = true

        // Wait for script to load
        await new Promise((resolve) => {
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      initializeMap()
    }

    loadLeaflet()

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [loading, location])

  // Initialize the map
  const initializeMap = () => {
    if (!window.L || mapInstance.current) return

    const L = window.L

    // Create map instance
    mapInstance.current = L.map(mapContainer.current).setView(
      [location.lat, location.lng],
      50
    )

    // Add tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.current)

    // Add user location marker
    L.marker([location.lat, location.lng]).addTo(mapInstance.current)

    // Initialize layer groups for each category
    layerGroups.current = {
      pollution: L.layerGroup(),
      potholes: L.layerGroup(),
      hygiene: L.layerGroup(),
      flooding: L.layerGroup(),
    }

    // Add layers to map
    Object.values(layerGroups.current).forEach((layer) => {
      layer.addTo(mapInstance.current)
    })

    // Add heatmap data to layers
    addHeatmapLayers()

    // Initially hide all except active layer
    Object.keys(layerGroups.current).forEach((key) => {
      if (key !== activeMap) {
        mapInstance.current.removeLayer(layerGroups.current[key])
      }
    })
  }

  // Update visible heatmap layer when activeMap changes
  useEffect(() => {
    if (!mapInstance.current || !layerGroups.current) return

    // Hide all layers first
    Object.keys(layerGroups.current).forEach((key) => {
      mapInstance.current.removeLayer(layerGroups.current[key])
    })

    // Show active layer
    layerGroups.current[activeMap].addTo(mapInstance.current)
  }, [activeMap])

  // Generate random heatmap data around the user's location
  const generateRandomData = (lat, lng) => {
    const createPoints = () => {
      const points = []
      for (let i = 0; i < 300; i++) {
        // Create points within ~200m radius (reduced from ~500m)
        const latOffset = (Math.random() - 0.5) * 0.005 // Reduced from 0.01
        const lngOffset = (Math.random() - 0.5) * 0.005 // Reduced from 0.01
        const intensity = Math.random()

        points.push({
          lat: lat + latOffset,
          lng: lng + lngOffset,
          intensity,
        })
      }
      return points
    }

    setHeatmapData({
      pollution: createPoints(),
      potholes: createPoints(),
      hygiene: createPoints(),
      flooding: createPoints(),
    })
  }

  // Add heatmap layers to the map
  const addHeatmapLayers = () => {
    if (!mapInstance.current || !window.L) return

    const L = window.L
    const colorSchemes = {
      pollution: [
        "#ffebee",
        "#ffcdd2",
        "#ef9a9a",
        "#e57373",
        "#ef5350",
        "#f44336",
      ],
      potholes: [
        "#e3f2fd",
        "#bbdefb",
        "#90caf9",
        "#64b5f6",
        "#42a5f5",
        "#2196f3",
      ],
      hygiene: [
        "#e8f5e9",
        "#c8e6c9",
        "#a5d6a7",
        "#81c784",
        "#66bb6a",
        "#4caf50",
      ],
      flooding: [
        "#f3e5f5",
        "#e1bee7",
        "#ce93d8",
        "#ba68c8",
        "#ab47bc",
        "#9c27b0",
      ],
    }

    const getColor = (intensity, category) => {
      const colors = colorSchemes[category]
      const index = Math.min(
        Math.floor(intensity * colors.length),
        colors.length - 1
      )
      return colors[index]
    }

    // Create circles for each data point
    Object.keys(heatmapData).forEach((category) => {
      layerGroups.current[category].clearLayers()

      heatmapData[category].forEach((point) => {
        const color = getColor(point.intensity, category)
        const opacity = 0.7
        const radius = 10 + point.intensity * 10 // 10-20 pixel radius

        const circle = L.circleMarker([point.lat, point.lng], {
          radius: radius,
          fillColor: color,
          fillOpacity: opacity,
          color: color,
          weight: 1,
          opacity: opacity * 0.8,
        }).addTo(layerGroups.current[category])

        // Add popup with information
        circle.bindPopup(`
          <strong>${
            category.charAt(0).toUpperCase() + category.slice(1)
          } Level</strong><br>
          Intensity: ${Math.round(point.intensity * 100)}%<br>
          Location: [${point.lat.toFixed(6)}, ${point.lng.toFixed(6)}]
        `)
      })
    })
  }

  const colorSchemes = {
    pollution: [
      "#ffebee",
      "#ffcdd2",
      "#ef9a9a",
      "#e57373",
      "#ef5350",
      "#f44336",
    ],
    potholes: [
      "#e3f2fd",
      "#bbdefb",
      "#90caf9",
      "#64b5f6",
      "#42a5f5",
      "#2196f3",
    ],
    hygiene: ["#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50"],
    flooding: [
      "#f3e5f5",
      "#e1bee7",
      "#ce93d8",
      "#ba68c8",
      "#ab47bc",
      "#9c27b0",
    ],
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">
          Loading map data...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow px-6 py-4 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">CitySense</h1>
          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-gray-600" />
            <span className="text-sm text-gray-600">
              {location
                ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                : "Location not available"}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="bg-white shadow-md p-4 md:w-64 z-10 overflow-y-auto">
          <h2 className="font-bold text-lg mb-4 text-gray-800">
            Environmental Layers
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => setActiveMap("pollution")}
              className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
                activeMap === "pollution"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span>Air Pollution</span>
            </button>

            <button
              onClick={() => setActiveMap("potholes")}
              className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
                activeMap === "potholes"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span>Road Potholes</span>
            </button>

            <button
              onClick={() => setActiveMap("hygiene")}
              className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
                activeMap === "hygiene"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>Public Hygiene</span>
            </button>

            <button
              onClick={() => setActiveMap("flooding")}
              className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
                activeMap === "flooding"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span>Water Flooding</span>
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Legend</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs">Low</span>
                <span className="text-xs">High</span>
              </div>
              <div
                className={`h-2 w-full rounded-full bg-gradient-to-r ${
                  activeMap === "pollution"
                    ? "from-red-200 to-red-700"
                    : activeMap === "potholes"
                    ? "from-blue-200 to-blue-700"
                    : activeMap === "hygiene"
                    ? "from-green-200 to-green-700"
                    : "from-purple-200 to-purple-700"
                }`}
              ></div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-sm mb-1">About this data</h3>
            <p className="text-xs text-gray-600">
              This visualization shows 1m radius data points for environmental
              monitoring. Currently using simulated data for demonstration
              purposes.
            </p>
          </div>

          {/* Statistics Panel */}
          <div className="mt-6 p-3 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-sm mb-2 capitalize">
              {activeMap} Statistics
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-600">Average:</div>
                <div className="font-medium">
                  {(
                    heatmapData[activeMap].reduce(
                      (sum, point) => sum + point.intensity,
                      0
                    ) / heatmapData[activeMap].length
                  ).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Data points:</div>
                <div className="font-medium">
                  {heatmapData[activeMap].length}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Highest:</div>
                <div className="font-medium">
                  {Math.max(
                    ...heatmapData[activeMap].map((point) => point.intensity)
                  ).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Radius:</div>
                <div className="font-medium">1m</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-grow relative">
          <div ref={mapContainer} className="absolute inset-0" />

          {/* Info overlay (only visible when map is loading) */}
          {!mapInstance.current && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
              <div className="text-lg font-semibold text-gray-700">
                Loading map...
              </div>
            </div>
          )}

          {/* Mobile layer selector (visible on small screens) */}
          <div className="md:hidden absolute bottom-4 left-4 right-4 bg-white p-2 rounded-lg shadow-lg z-20 flex justify-between">
            {Object.keys(heatmapData).map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveMap(layer)}
                className={`p-2 rounded-full ${
                  activeMap === layer ? "bg-gray-200" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    layer === "pollution"
                      ? "bg-red-500"
                      : layer === "potholes"
                      ? "bg-blue-500"
                      : layer === "hygiene"
                      ? "bg-green-500"
                      : "bg-purple-500"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner p-4 z-10">
        <div className="container mx-auto text-center text-sm text-gray-600">
          <p>CitySense &copy; 2025</p>
        </div>
      </footer>
    </div>
  )
}

// App component with routing
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<HeatmapVisualization />} />
      </Routes>
    </Router>
  )
}
