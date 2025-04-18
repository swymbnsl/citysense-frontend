import React from "react"
import {
  MapPin,
  Bus,
  Database,
  ChartBar,
  Shield,
  ArrowRight,
} from "lucide-react"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed w-full z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              CitySense
            </h1>
            <Link
              to="/dashboard"
              className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
            >
              View Dashboard{" "}
              <ArrowRight size={16} className="hidden sm:block" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-70"></div>
          <div className="container mx-auto max-w-7xl relative">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Smart Urban Monitoring for a{" "}
                  <span className="text-blue-600">Better Tomorrow</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                  CitySense transforms public transportation into a network of
                  environmental sensors, providing continuous, real-time data
                  about your city's environmental conditions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/dashboard"
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-base sm:text-lg font-medium"
                  >
                    Explore Data{" "}
                    <ArrowRight size={18} className="hidden sm:block" />
                  </Link>
                  <a
                    href="#how-it-works"
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors text-base sm:text-lg font-medium text-center"
                  >
                    Learn More
                  </a>
                </div>
                <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                      24/7
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                      Continuous Monitoring
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                      100+
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                      Sensors Deployed
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                      4
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                      Environmental Metrics
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-8 lg:mt-0">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-10 blur-2xl"></div>
                <img
                  src="/image.png"
                  alt="CitySense Dashboard Preview"
                  className="rounded-2xl shadow-2xl relative w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Comprehensive Urban Monitoring
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Our innovative approach combines mobile sensors with advanced
                analytics to provide unprecedented insights into urban
                environmental conditions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Bus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Mobile Sensors
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Our compact sensors are mounted on public transport vehicles,
                  creating a dynamic network that covers the entire city.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Continuous Data Collection
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Sensors collect environmental data 24/7, providing
                  comprehensive coverage of air quality, road conditions, and
                  more.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <ChartBar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Real-Time Analysis
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Data is processed in real-time, generating heatmaps and
                  insights that help city planners and residents make informed
                  decisions.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Privacy-First Approach
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Our system collects only environmental data, ensuring privacy
                  while providing valuable insights for urban planning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-12 sm:py-20 bg-gray-50 px-4 sm:px-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                How CitySense Works
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Our innovative system transforms public transport into a mobile
                environmental monitoring network.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">
                    1
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Sensor Deployment
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Compact environmental sensors are strategically mounted on
                  public transport vehicles, creating a mobile network that
                  covers the entire city.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">
                    2
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Data Collection
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  As vehicles move throughout the city, sensors continuously
                  collect data on air quality, road conditions, and other
                  environmental factors.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">
                    3
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Real-Time Visualization
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Data is processed and displayed on our interactive dashboard,
                  providing real-time heatmaps and insights for city planners
                  and residents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Ready to explore your city's data?
            </h2>
            <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8">
              Access real-time environmental data and insights through our
              interactive dashboard.
            </p>
            <Link
              to="/dashboard"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 text-base sm:text-lg font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl sm:text-2xl font-bold">CitySense</h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Real-time urban environment monitoring
              </p>
            </div>
            <div className="flex space-x-6 sm:space-x-8">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                Privacy
              </a>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400 text-sm sm:text-base">
            <p>CitySense &copy; 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
