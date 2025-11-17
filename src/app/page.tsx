"use client"

import { useState, useEffect } from "react"
import { 
  Plane, 
  Hotel, 
  Car, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users,
  Search,
  TrendingDown,
  Star,
  ArrowRight,
  Briefcase,
  Shield,
  Fuel,
  ChevronRight,
  ExternalLink
} from "lucide-react"

interface SearchParams {
  origem: string
  destino: string
  dataIda: string
  dataVolta: string
  passageiros: number
}

interface Voo {
  id: string
  companhia: string
  origem: string
  destino: string
  horarioIda: string
  horarioChegada: string
  duracao: string
  preco: number
  escalas: number
  classe: string
  linkReserva: string
}

interface Hospedagem {
  id: string
  nome: string
  tipo: string
  localizacao: string
  estrelas: number
  precoPorNoite: number
  comodidades: string[]
  avaliacao: number
  imagem: string
  linkReserva: string
}

interface Carro {
  id: string
  modelo: string
  categoria: string
  locadora: string
  precoPorDia: number
  combustivel: string
  transmissao: string
  passageiros: number
  malas: number
  seguro: boolean
  linkReserva: string
}

export default function TravelPlanner() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<"voos" | "hospedagem" | "carros">("voos")
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origem: "São Paulo (GRU)",
    destino: "Rio de Janeiro (GIG)",
    dataIda: "2024-06-15",
    dataVolta: "2024-06-22",
    passageiros: 2
  })

  const [selectedVoo, setSelectedVoo] = useState<Voo | null>(null)
  const [selectedHospedagem, setSelectedHospedagem] = useState<Hospedagem | null>(null)
  const [selectedCarro, setSelectedCarro] = useState<Carro | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Dados mockados de voos
  const voos: Voo[] = [
    {
      id: "v1",
      companhia: "LATAM Airlines",
      origem: "GRU",
      destino: "GIG",
      horarioIda: "08:30",
      horarioChegada: "09:45",
      duracao: "1h 15min",
      preco: 450,
      escalas: 0,
      classe: "Econômica",
      linkReserva: "https://www.latamairlines.com"
    },
    {
      id: "v2",
      companhia: "GOL Linhas Aéreas",
      origem: "GRU",
      destino: "GIG",
      horarioIda: "14:20",
      horarioChegada: "15:40",
      duracao: "1h 20min",
      preco: 380,
      escalas: 0,
      classe: "Econômica",
      linkReserva: "https://www.voegol.com.br"
    },
    {
      id: "v3",
      companhia: "Azul Linhas Aéreas",
      origem: "GRU",
      destino: "GIG",
      horarioIda: "18:00",
      horarioChegada: "19:25",
      duracao: "1h 25min",
      preco: 520,
      escalas: 0,
      classe: "Econômica",
      linkReserva: "https://www.voeazul.com.br"
    }
  ]

  // Dados mockados de hospedagem
  const hospedagens: Hospedagem[] = [
    {
      id: "h1",
      nome: "Copacabana Palace",
      tipo: "Hotel de Luxo",
      localizacao: "Copacabana, Rio de Janeiro",
      estrelas: 5,
      precoPorNoite: 850,
      comodidades: ["Wi-Fi", "Piscina", "Restaurante", "Spa", "Academia"],
      avaliacao: 9.4,
      imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      linkReserva: "https://www.booking.com"
    },
    {
      id: "h2",
      nome: "Hilton Barra Rio de Janeiro",
      tipo: "Hotel",
      localizacao: "Barra da Tijuca, Rio de Janeiro",
      estrelas: 4,
      precoPorNoite: 520,
      comodidades: ["Wi-Fi", "Piscina", "Restaurante", "Estacionamento"],
      avaliacao: 8.8,
      imagem: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      linkReserva: "https://www.hilton.com"
    },
    {
      id: "h3",
      nome: "Ibis Copacabana",
      tipo: "Hotel Econômico",
      localizacao: "Copacabana, Rio de Janeiro",
      estrelas: 3,
      precoPorNoite: 280,
      comodidades: ["Wi-Fi", "Café da manhã", "Ar condicionado"],
      avaliacao: 8.2,
      imagem: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=300&fit=crop",
      linkReserva: "https://www.accor.com"
    }
  ]

  // Dados mockados de carros
  const carros: Carro[] = [
    {
      id: "c1",
      modelo: "Volkswagen Gol",
      categoria: "Econômico",
      locadora: "Localiza",
      precoPorDia: 120,
      combustivel: "Flex",
      transmissao: "Manual",
      passageiros: 5,
      malas: 2,
      seguro: true,
      linkReserva: "https://www.localiza.com"
    },
    {
      id: "c2",
      modelo: "Toyota Corolla",
      categoria: "Intermediário",
      locadora: "Movida",
      precoPorDia: 180,
      combustivel: "Flex",
      transmissao: "Automático",
      passageiros: 5,
      malas: 3,
      seguro: true,
      linkReserva: "https://www.movida.com.br"
    },
    {
      id: "c3",
      modelo: "Jeep Compass",
      categoria: "SUV",
      locadora: "Unidas",
      precoPorDia: 280,
      combustivel: "Flex",
      transmissao: "Automático",
      passageiros: 5,
      malas: 4,
      seguro: true,
      linkReserva: "https://www.unidas.com.br"
    }
  ]

  // Calcular totais
  const calcularDias = () => {
    const ida = new Date(searchParams.dataIda)
    const volta = new Date(searchParams.dataVolta)
    return Math.ceil((volta.getTime() - ida.getTime()) / (1000 * 60 * 60 * 24))
  }

  const dias = calcularDias()
  const totalVoos = selectedVoo ? selectedVoo.preco * searchParams.passageiros * 2 : 0
  const totalHospedagem = selectedHospedagem ? selectedHospedagem.precoPorNoite * dias : 0
  const totalCarros = selectedCarro ? selectedCarro.precoPorDia * dias : 0
  const totalGeral = totalVoos + totalHospedagem + totalCarros

  // Formatar data de forma consistente
  const formatarData = (dataString: string) => {
    if (!mounted) return ""
    const data = new Date(dataString + "T00:00:00")
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TravelPlan Pro
                </h1>
                <p className="text-sm text-gray-600">Planeje sua viagem perfeita</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{dias} dias de viagem</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{searchParams.passageiros} passageiros</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Origem
              </label>
              <input
                type="text"
                value={searchParams.origem}
                onChange={(e) => setSearchParams({...searchParams, origem: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Destino
              </label>
              <input
                type="text"
                value={searchParams.destino}
                onChange={(e) => setSearchParams({...searchParams, destino: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Data Ida
              </label>
              <input
                type="date"
                value={searchParams.dataIda}
                onChange={(e) => setSearchParams({...searchParams, dataIda: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Data Volta
              </label>
              <input
                type="date"
                value={searchParams.dataVolta}
                onChange={(e) => setSearchParams({...searchParams, dataVolta: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Passageiros
              </label>
              <input
                type="number"
                min="1"
                value={searchParams.passageiros}
                onChange={(e) => setSearchParams({...searchParams, passageiros: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
            <Search className="w-5 h-5" />
            Buscar Melhores Ofertas
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2 border border-gray-100">
              <button
                onClick={() => setActiveTab("voos")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "voos"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Plane className="w-5 h-5" />
                Voos
              </button>
              <button
                onClick={() => setActiveTab("hospedagem")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "hospedagem"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Hotel className="w-5 h-5" />
                Hospedagem
              </button>
              <button
                onClick={() => setActiveTab("carros")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "carros"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Car className="w-5 h-5" />
                Carros
              </button>
            </div>

            {/* Voos */}
            {activeTab === "voos" && (
              <div className="space-y-4">
                {voos.map((voo) => (
                  <div
                    key={voo.id}
                    className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                      selectedVoo?.id === voo.id
                        ? "border-blue-600 shadow-lg"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{voo.companhia}</h3>
                        <p className="text-sm text-gray-600">{voo.classe}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          R$ {voo.preco}
                        </div>
                        <p className="text-sm text-gray-600">por pessoa</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{voo.horarioIda}</div>
                        <div className="text-sm text-gray-600">{voo.origem}</div>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-px bg-gray-300 flex-1"></div>
                          <Plane className="w-5 h-5 text-gray-400" />
                          <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        <div className="text-center text-sm text-gray-600 mt-1">{voo.duracao}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{voo.horarioChegada}</div>
                        <div className="text-sm text-gray-600">{voo.destino}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-green-600">
                          <TrendingDown className="w-4 h-4" />
                          Melhor preço
                        </span>
                        <span className="text-gray-600">
                          {voo.escalas === 0 ? "Voo direto" : `${voo.escalas} escala(s)`}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedVoo(voo)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                            selectedVoo?.id === voo.id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {selectedVoo?.id === voo.id ? "Selecionado" : "Selecionar"}
                        </button>
                        <a
                          href={voo.linkReserva}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                        >
                          Reservar
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Hospedagem */}
            {activeTab === "hospedagem" && (
              <div className="space-y-4">
                {hospedagens.map((hotel) => (
                  <div
                    key={hotel.id}
                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                      selectedHospedagem?.id === hotel.id
                        ? "border-blue-600 shadow-lg"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={hotel.imagem}
                          alt={hotel.nome}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{hotel.nome}</h3>
                            <p className="text-sm text-gray-600">{hotel.tipo}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(hotel.estrelas)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">
                              R$ {hotel.precoPorNoite}
                            </div>
                            <p className="text-sm text-gray-600">por noite</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          {hotel.localizacao}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {hotel.comodidades.map((comodidade, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                            >
                              {comodidade}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold">
                              {hotel.avaliacao}
                            </div>
                            <span className="text-sm text-gray-600">Excelente avaliação</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedHospedagem(hotel)}
                              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                                selectedHospedagem?.id === hotel.id
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {selectedHospedagem?.id === hotel.id ? "Selecionado" : "Selecionar"}
                            </button>
                            <a
                              href={hotel.linkReserva}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                            >
                              Reservar
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Carros */}
            {activeTab === "carros" && (
              <div className="space-y-4">
                {carros.map((carro) => (
                  <div
                    key={carro.id}
                    className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                      selectedCarro?.id === carro.id
                        ? "border-blue-600 shadow-lg"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{carro.modelo}</h3>
                        <p className="text-sm text-gray-600">{carro.categoria}</p>
                        <p className="text-sm text-gray-500 mt-1">{carro.locadora}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          R$ {carro.precoPorDia}
                        </div>
                        <p className="text-sm text-gray-600">por dia</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {carro.passageiros} pessoas
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        {carro.malas} malas
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Fuel className="w-4 h-4" />
                        {carro.combustivel}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Car className="w-4 h-4" />
                        {carro.transmissao}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {carro.seguro && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Shield className="w-4 h-4" />
                          Seguro completo incluído
                        </div>
                      )}
                      <div className="flex gap-2 ml-auto">
                        <button
                          onClick={() => setSelectedCarro(carro)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                            selectedCarro?.id === carro.id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {selectedCarro?.id === carro.id ? "Selecionado" : "Selecionar"}
                        </button>
                        <a
                          href={carro.linkReserva}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                        >
                          Alugar
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dashboard Sidebar */}
          <div className="space-y-6">
            {/* Resumo da Viagem */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-blue-600" />
                Resumo da Viagem
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Plane className="w-5 h-5" />
                    <span>Voos (ida e volta)</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {selectedVoo ? `R$ ${totalVoos.toLocaleString('pt-BR')}` : "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Hotel className="w-5 h-5" />
                    <span>Hospedagem ({dias} noites)</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {selectedHospedagem ? `R$ ${totalHospedagem.toLocaleString('pt-BR')}` : "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Car className="w-5 h-5" />
                    <span>Aluguel de carro ({dias} dias)</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {selectedCarro ? `R$ ${totalCarros.toLocaleString('pt-BR')}` : "-"}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">Total da Viagem</span>
                  <Users className="w-5 h-5 opacity-90" />
                </div>
                <div className="text-4xl font-bold mb-1">
                  R$ {totalGeral.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm opacity-90">
                  Para {searchParams.passageiros} {searchParams.passageiros === 1 ? 'pessoa' : 'pessoas'}
                </div>
              </div>

              {totalGeral > 0 && (
                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  Confirmar Reserva
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Informações da Viagem */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Detalhes da Viagem</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Datas</div>
                    <div className="text-sm text-gray-600">
                      {formatarData(searchParams.dataIda)} até {formatarData(searchParams.dataVolta)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Duração</div>
                    <div className="text-sm text-gray-600">{dias} dias e {dias - 1} noites</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Rota</div>
                    <div className="text-sm text-gray-600">
                      {searchParams.origem} → {searchParams.destino}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dicas */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">💡 Dicas de Economia</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Reserve com antecedência para melhores preços</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Voos em horários alternativos são mais baratos</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Compare locadoras de carros no aeroporto</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
