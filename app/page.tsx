"use client";

import Image from "next/image";
import {
  ArrowDown,
  Check,
  ChevronDown,
  ChevronRight,
  KeyRound,
  Languages,
  Luggage,
  MessageCircle,
  Minus,
  Plane,
  Plus,
  Ship,
  Users,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { apartments } from "./apartments";

const transfers = [
  { id: "ezeiza", price: 50, keyPrice: 55, icon: Plane },
  { id: "aeroparque", price: 25, keyPrice: 30, icon: Plane },
  { id: "buquebus", price: 25, keyPrice: 30, icon: Ship },
] as const;

type TransferId = (typeof transfers)[number]["id"];

const translations = {
  es: {
    language: "Idioma",
    reserve: "Reservar traslado",
    heroEyebrow: "Llegadas a Buenos Aires",
    heroCopy: "Tu llegada, resuelta. Traslado privado hasta el apartamento y entrega de llaves cuando la necesites.",
    request: "Solicitar traslado",
    meeting: "El punto de encuentro se coordina directamente con el conductor por WhatsApp.",
    bookingEyebrow: "Reserva simple",
    bookingTitle: "Organiza tu llegada",
    bookingIntro: "Selecciona el punto de llegada, completa tus datos y envía la solicitud por WhatsApp.",
    fromWhere: "¿Desde dónde llegas?",
    arrivalData: "Datos de llegada",
    whatsapp: "Número de WhatsApp",
    whatsappPlaceholder: "Ej. +54 9 11 1234 5678",
    arrival: "Fecha y hora de llegada",
    travelNumber: "Número de vuelo / barco",
    travelPlaceholder: "Ej. AR 1301",
    carrier: "Aerolínea / compañía",
    carrierPlaceholder: "Ej. Aerolíneas Argentinas",
    apartment: "Apartamento / dirección de destino",
    apartmentPlaceholder: "Selecciona tu departamento",
    passengersAndBags: "Pasajeros y equipaje",
    passengers: "Pasajeros",
    bags: "Maletas",
    reduce: "Reducir",
    increase: "Aumentar",
    yourTransfer: "Tu traslado",
    apartmentShort: "Apartamento",
    privateTransfer: "Traslado privado",
    keyDelivery: "Entrega de llaves",
    keyDetail: "Se determina automáticamente según el departamento",
    total: "Total",
    send: "Enviar solicitud",
    confirmation: "La reserva queda sujeta a confirmación por WhatsApp.",
    storyEyebrow: "De la terminal a casa",
    storyTitle: "Una llegada sin vueltas",
    story1Title: "Envía tus datos",
    story1Text: "Vuelo, horario, pasajeros y equipaje.",
    story2Title: "Conoce a tu conductor",
    story2Text: "Coordinamos el encuentro directamente por WhatsApp.",
    story3Title: "Llega al apartamento",
    story3Text: "Si hace falta, el conductor también te entrega las llaves.",
    ratesEyebrow: "Tarifas claras",
    ratesTitle: "Sin sorpresas al llegar",
    withKeys: "Con llaves",
    ferryEyebrow: "También desde la terminal fluvial",
    ferryTitle: "Buquebus y Colonia Express",
    reserveFrom: "Reservar desde USD 25",
    footerCopy: "Traslados privados y asistencia de llegada en Buenos Aires.",
    yes: "Sí",
    no: "No",
    heroAlt: "Chofer de BT Concierge recibiendo a una pasajera en el aeropuerto",
    storyAlt: "Recepción de una huésped frente a su alojamiento en Buenos Aires",
    ferryAlt: "Traslado privado desde Buquebus o Colonia Express",
    logoAlt: "Logo de BT Concierge",
    transfers: {
      ezeiza: { name: "Ezeiza", detail: "Aeropuerto Internacional EZE" },
      aeroparque: { name: "Aeroparque", detail: "Aeroparque Jorge Newbery AEP" },
      buquebus: { name: "Terminal fluvial", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "Hola BT Concierge, quisiera solicitar un traslado.",
      origin: "Origen",
      arrival: "Fecha y hora de llegada",
      travel: "Vuelo / barco",
      carrier: "Aerolínea / compañía",
      passengers: "Pasajeros",
      bags: "Maletas",
      whatsapp: "WhatsApp del huésped",
      apartment: "Apartamento / dirección",
      keys: "Entrega de llaves",
      closing: "Quedo atento/a a la coordinación del punto de encuentro con el conductor asignado.",
    },
  },
  en: {
    language: "Language",
    reserve: "Book transfer",
    heroEyebrow: "Arrivals in Buenos Aires",
    heroCopy: "Your arrival, taken care of. Private transfer to your apartment, with key delivery whenever you need it.",
    request: "Request transfer",
    meeting: "The meeting point is coordinated directly with your assigned driver via WhatsApp.",
    bookingEyebrow: "Simple booking",
    bookingTitle: "Plan your arrival",
    bookingIntro: "Choose your arrival point, enter your details and send the request through WhatsApp.",
    fromWhere: "Where are you arriving from?",
    arrivalData: "Arrival details",
    whatsapp: "WhatsApp number",
    whatsappPlaceholder: "E.g. +1 202 555 0147",
    arrival: "Arrival date and time",
    travelNumber: "Flight / ferry number",
    travelPlaceholder: "E.g. AR 1301",
    carrier: "Airline / ferry company",
    carrierPlaceholder: "E.g. Aerolíneas Argentinas",
    apartment: "Apartment / destination address",
    apartmentPlaceholder: "Select your apartment",
    passengersAndBags: "Passengers and luggage",
    passengers: "Passengers",
    bags: "Bags",
    reduce: "Decrease",
    increase: "Increase",
    yourTransfer: "Your transfer",
    apartmentShort: "Apartment",
    privateTransfer: "Private transfer",
    keyDelivery: "Key delivery",
    keyDetail: "Automatically determined by the selected apartment",
    total: "Total",
    send: "Send request",
    confirmation: "Your booking is subject to confirmation via WhatsApp.",
    storyEyebrow: "From the terminal to home",
    storyTitle: "A smooth arrival",
    story1Title: "Send your details",
    story1Text: "Flight, arrival time, passengers and luggage.",
    story2Title: "Meet your driver",
    story2Text: "We coordinate the meeting point directly via WhatsApp.",
    story3Title: "Arrive at your apartment",
    story3Text: "When needed, your driver will also deliver the keys.",
    ratesEyebrow: "Clear rates",
    ratesTitle: "No surprises on arrival",
    withKeys: "With keys",
    ferryEyebrow: "Also from the ferry terminal",
    ferryTitle: "Buquebus and Colonia Express",
    reserveFrom: "Book from USD 25",
    footerCopy: "Private transfers and arrival assistance in Buenos Aires.",
    yes: "Yes",
    no: "No",
    heroAlt: "BT Concierge driver welcoming a passenger at the airport",
    storyAlt: "Guest being welcomed outside her accommodation in Buenos Aires",
    ferryAlt: "Private transfer from Buquebus or Colonia Express",
    logoAlt: "BT Concierge logo",
    transfers: {
      ezeiza: { name: "Ezeiza", detail: "EZE International Airport" },
      aeroparque: { name: "Aeroparque", detail: "Jorge Newbery Airport AEP" },
      buquebus: { name: "Ferry terminal", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "Hello BT Concierge, I would like to request a transfer.",
      origin: "Origin",
      arrival: "Arrival date and time",
      travel: "Flight / ferry",
      carrier: "Airline / company",
      passengers: "Passengers",
      bags: "Bags",
      whatsapp: "Guest WhatsApp",
      apartment: "Apartment / address",
      keys: "Key delivery",
      closing: "I look forward to coordinating the meeting point with the assigned driver.",
    },
  },
  fr: {
    language: "Langue",
    reserve: "Réserver le transfert",
    heroEyebrow: "Arrivées à Buenos Aires",
    heroCopy: "Votre arrivée, parfaitement organisée. Transfert privé jusqu'à votre appartement et remise des clés si nécessaire.",
    request: "Demander un transfert",
    meeting: "Le point de rendez-vous est coordonné directement avec votre chauffeur via WhatsApp.",
    bookingEyebrow: "Réservation simple",
    bookingTitle: "Organisez votre arrivée",
    bookingIntro: "Choisissez votre point d'arrivée, renseignez vos informations et envoyez la demande via WhatsApp.",
    fromWhere: "D'où arrivez-vous ?",
    arrivalData: "Informations d'arrivée",
    whatsapp: "Numéro WhatsApp",
    whatsappPlaceholder: "Ex. +33 6 12 34 56 78",
    arrival: "Date et heure d'arrivée",
    travelNumber: "Numéro de vol / bateau",
    travelPlaceholder: "Ex. AR 1301",
    carrier: "Compagnie aérienne / maritime",
    carrierPlaceholder: "Ex. Air France",
    apartment: "Appartement / adresse de destination",
    apartmentPlaceholder: "Sélectionnez votre appartement",
    passengersAndBags: "Passagers et bagages",
    passengers: "Passagers",
    bags: "Valises",
    reduce: "Réduire",
    increase: "Augmenter",
    yourTransfer: "Votre transfert",
    apartmentShort: "Appartement",
    privateTransfer: "Transfert privé",
    keyDelivery: "Remise des clés",
    keyDetail: "Déterminé automatiquement selon l'appartement",
    total: "Total",
    send: "Envoyer la demande",
    confirmation: "La réservation est soumise à confirmation via WhatsApp.",
    storyEyebrow: "Du terminal à votre logement",
    storyTitle: "Une arrivée en toute sérénité",
    story1Title: "Envoyez vos informations",
    story1Text: "Vol, horaire, passagers et bagages.",
    story2Title: "Rencontrez votre chauffeur",
    story2Text: "Nous coordonnons le rendez-vous directement via WhatsApp.",
    story3Title: "Arrivez à votre appartement",
    story3Text: "Si nécessaire, le chauffeur vous remet également les clés.",
    ratesEyebrow: "Tarifs transparents",
    ratesTitle: "Aucune surprise à l'arrivée",
    withKeys: "Avec les clés",
    ferryEyebrow: "Également depuis le terminal fluvial",
    ferryTitle: "Buquebus et Colonia Express",
    reserveFrom: "Réserver dès 25 USD",
    footerCopy: "Transferts privés et assistance à l'arrivée à Buenos Aires.",
    yes: "Oui",
    no: "Non",
    heroAlt: "Chauffeur BT Concierge accueillant une passagère à l'aéroport",
    storyAlt: "Accueil d'une voyageuse devant son logement à Buenos Aires",
    ferryAlt: "Transfert privé depuis Buquebus ou Colonia Express",
    logoAlt: "Logo BT Concierge",
    transfers: {
      ezeiza: { name: "Ezeiza", detail: "Aéroport international EZE" },
      aeroparque: { name: "Aeroparque", detail: "Aéroport Jorge Newbery AEP" },
      buquebus: { name: "Terminal fluvial", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "Bonjour BT Concierge, je souhaite réserver un transfert.",
      origin: "Origine",
      arrival: "Date et heure d'arrivée",
      travel: "Vol / bateau",
      carrier: "Compagnie",
      passengers: "Passagers",
      bags: "Valises",
      whatsapp: "WhatsApp du voyageur",
      apartment: "Appartement / adresse",
      keys: "Remise des clés",
      closing: "Je reste disponible pour coordonner le point de rendez-vous avec le chauffeur assigné.",
    },
  },
  de: {
    language: "Sprache",
    reserve: "Transfer buchen",
    heroEyebrow: "Ankunft in Buenos Aires",
    heroCopy: "Ihre Ankunft, bestens organisiert. Privater Transfer zu Ihrem Apartment und Schlüsselübergabe bei Bedarf.",
    request: "Transfer anfragen",
    meeting: "Der Treffpunkt wird direkt mit Ihrem Fahrer über WhatsApp abgestimmt.",
    bookingEyebrow: "Einfache Buchung",
    bookingTitle: "Planen Sie Ihre Ankunft",
    bookingIntro: "Wählen Sie Ihren Ankunftsort, geben Sie Ihre Daten ein und senden Sie die Anfrage über WhatsApp.",
    fromWhere: "Wo kommen Sie an?",
    arrivalData: "Ankunftsdaten",
    whatsapp: "WhatsApp-Nummer",
    whatsappPlaceholder: "Z. B. +49 151 23456789",
    arrival: "Ankunftsdatum und Uhrzeit",
    travelNumber: "Flug- / Fährnummer",
    travelPlaceholder: "Z. B. AR 1301",
    carrier: "Fluggesellschaft / Reederei",
    carrierPlaceholder: "Z. B. Lufthansa",
    apartment: "Apartment / Zieladresse",
    apartmentPlaceholder: "Apartment auswählen",
    passengersAndBags: "Passagiere und Gepäck",
    passengers: "Passagiere",
    bags: "Koffer",
    reduce: "Verringern",
    increase: "Erhöhen",
    yourTransfer: "Ihr Transfer",
    apartmentShort: "Apartment",
    privateTransfer: "Privater Transfer",
    keyDelivery: "Schlüsselübergabe",
    keyDetail: "Wird automatisch anhand des Apartments bestimmt",
    total: "Gesamt",
    send: "Anfrage senden",
    confirmation: "Die Buchung wird über WhatsApp bestätigt.",
    storyEyebrow: "Vom Terminal nach Hause",
    storyTitle: "Entspannt ankommen",
    story1Title: "Daten senden",
    story1Text: "Flug, Uhrzeit, Passagiere und Gepäck.",
    story2Title: "Fahrer kennenlernen",
    story2Text: "Wir stimmen den Treffpunkt direkt über WhatsApp ab.",
    story3Title: "Am Apartment ankommen",
    story3Text: "Bei Bedarf übergibt Ihnen der Fahrer auch die Schlüssel.",
    ratesEyebrow: "Klare Preise",
    ratesTitle: "Keine Überraschungen bei der Ankunft",
    withKeys: "Mit Schlüsseln",
    ferryEyebrow: "Auch vom Fährterminal",
    ferryTitle: "Buquebus und Colonia Express",
    reserveFrom: "Ab 25 USD buchen",
    footerCopy: "Private Transfers und Ankunftsservice in Buenos Aires.",
    yes: "Ja",
    no: "Nein",
    heroAlt: "BT Concierge Fahrer begrüßt einen Gast am Flughafen",
    storyAlt: "Empfang eines Gastes vor der Unterkunft in Buenos Aires",
    ferryAlt: "Privater Transfer von Buquebus oder Colonia Express",
    logoAlt: "BT Concierge Logo",
    transfers: {
      ezeiza: { name: "Ezeiza", detail: "Internationaler Flughafen EZE" },
      aeroparque: { name: "Aeroparque", detail: "Flughafen Jorge Newbery AEP" },
      buquebus: { name: "Fährterminal", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "Hallo BT Concierge, ich möchte einen Transfer anfragen.",
      origin: "Startpunkt",
      arrival: "Ankunftsdatum und Uhrzeit",
      travel: "Flug / Fähre",
      carrier: "Fluggesellschaft / Reederei",
      passengers: "Passagiere",
      bags: "Koffer",
      whatsapp: "WhatsApp des Gastes",
      apartment: "Apartment / Adresse",
      keys: "Schlüsselübergabe",
      closing: "Ich freue mich auf die Abstimmung des Treffpunkts mit dem zugewiesenen Fahrer.",
    },
  },
  ja: {
    language: "言語",
    reserve: "送迎を予約",
    heroEyebrow: "ブエノスアイレス到着",
    heroCopy: "ご到着をスムーズに。空港・港からアパートまでの専用送迎と、必要に応じた鍵の受け渡しをご用意します。",
    request: "送迎を申し込む",
    meeting: "待ち合わせ場所は、担当ドライバーとWhatsAppで直接調整します。",
    bookingEyebrow: "簡単予約",
    bookingTitle: "到着を手配する",
    bookingIntro: "到着場所を選び、必要事項を入力してWhatsAppからリクエストを送信してください。",
    fromWhere: "どちらに到着しますか？",
    arrivalData: "到着情報",
    whatsapp: "WhatsApp番号",
    whatsappPlaceholder: "例：+81 90 1234 5678",
    arrival: "到着日時",
    travelNumber: "便名 / 船便番号",
    travelPlaceholder: "例：AR 1301",
    carrier: "航空会社 / 船会社",
    carrierPlaceholder: "例：Japan Airlines",
    apartment: "アパート / 目的地住所",
    apartmentPlaceholder: "アパートを選択",
    passengersAndBags: "乗客と荷物",
    passengers: "乗客",
    bags: "スーツケース",
    reduce: "減らす",
    increase: "増やす",
    yourTransfer: "送迎内容",
    apartmentShort: "アパート",
    privateTransfer: "専用送迎",
    keyDelivery: "鍵の受け渡し",
    keyDetail: "選択したアパートに応じて自動判定されます",
    total: "合計",
    send: "リクエストを送信",
    confirmation: "予約はWhatsAppでの確認後に確定します。",
    storyEyebrow: "ターミナルからご自宅へ",
    storyTitle: "安心でスムーズな到着",
    story1Title: "情報を送信",
    story1Text: "便名、到着時刻、乗客数、荷物数をご入力ください。",
    story2Title: "ドライバーと合流",
    story2Text: "待ち合わせ場所をWhatsAppで直接調整します。",
    story3Title: "アパートへ到着",
    story3Text: "必要な場合は、ドライバーが鍵もお渡しします。",
    ratesEyebrow: "明確な料金",
    ratesTitle: "到着時の追加料金なし",
    withKeys: "鍵の受け渡し込み",
    ferryEyebrow: "フェリーターミナルからも対応",
    ferryTitle: "Buquebus / Colonia Express",
    reserveFrom: "25米ドルから予約",
    footerCopy: "ブエノスアイレスでの専用送迎と到着サポート。",
    yes: "はい",
    no: "いいえ",
    heroAlt: "空港で乗客を迎えるBT Conciergeのドライバー",
    storyAlt: "ブエノスアイレスの宿泊先前でゲストを迎える様子",
    ferryAlt: "BuquebusまたはColonia Expressからの専用送迎",
    logoAlt: "BT Concierge ロゴ",
    transfers: {
      ezeiza: { name: "エセイサ", detail: "EZE国際空港" },
      aeroparque: { name: "アエロパルケ", detail: "ホルヘ・ニューベリー空港 AEP" },
      buquebus: { name: "フェリーターミナル", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "BT Concierge様、送迎を希望します。",
      origin: "出発地",
      arrival: "到着日時",
      travel: "便名 / 船便",
      carrier: "航空会社 / 船会社",
      passengers: "乗客数",
      bags: "荷物数",
      whatsapp: "ゲストのWhatsApp",
      apartment: "アパート / 住所",
      keys: "鍵の受け渡し",
      closing: "担当ドライバーとの待ち合わせ場所の調整をお願いいたします。",
    },
  },
  pt: {
    language: "Idioma",
    reserve: "Reservar traslado",
    heroEyebrow: "Chegadas a Buenos Aires",
    heroCopy: "Sua chegada, resolvida. Traslado privativo até o apartamento e entrega das chaves quando necessário.",
    request: "Solicitar traslado",
    meeting: "O ponto de encontro é combinado diretamente com o motorista pelo WhatsApp.",
    bookingEyebrow: "Reserva simples",
    bookingTitle: "Organize sua chegada",
    bookingIntro: "Escolha o ponto de chegada, preencha seus dados e envie a solicitação pelo WhatsApp.",
    fromWhere: "De onde você chega?",
    arrivalData: "Dados da chegada",
    whatsapp: "Número do WhatsApp",
    whatsappPlaceholder: "Ex. +55 11 91234 5678",
    arrival: "Data e hora da chegada",
    travelNumber: "Número do voo / barco",
    travelPlaceholder: "Ex. AR 1301",
    carrier: "Companhia aérea / marítima",
    carrierPlaceholder: "Ex. LATAM",
    apartment: "Apartamento / endereço de destino",
    apartmentPlaceholder: "Selecione seu apartamento",
    passengersAndBags: "Passageiros e bagagem",
    passengers: "Passageiros",
    bags: "Malas",
    reduce: "Diminuir",
    increase: "Aumentar",
    yourTransfer: "Seu traslado",
    apartmentShort: "Apartamento",
    privateTransfer: "Traslado privativo",
    keyDelivery: "Entrega das chaves",
    keyDetail: "Determinado automaticamente conforme o apartamento",
    total: "Total",
    send: "Enviar solicitação",
    confirmation: "A reserva está sujeita à confirmação pelo WhatsApp.",
    storyEyebrow: "Do terminal até sua casa",
    storyTitle: "Uma chegada tranquila",
    story1Title: "Envie seus dados",
    story1Text: "Voo, horário, passageiros e bagagem.",
    story2Title: "Encontre seu motorista",
    story2Text: "Coordenamos o encontro diretamente pelo WhatsApp.",
    story3Title: "Chegue ao apartamento",
    story3Text: "Se necessário, o motorista também entrega as chaves.",
    ratesEyebrow: "Tarifas transparentes",
    ratesTitle: "Sem surpresas na chegada",
    withKeys: "Com as chaves",
    ferryEyebrow: "Também a partir do terminal fluvial",
    ferryTitle: "Buquebus e Colonia Express",
    reserveFrom: "Reservar a partir de USD 25",
    footerCopy: "Traslados privativos e assistência na chegada em Buenos Aires.",
    yes: "Sim",
    no: "Não",
    heroAlt: "Motorista da BT Concierge recebendo uma passageira no aeroporto",
    storyAlt: "Recepção de uma hóspede em frente à hospedagem em Buenos Aires",
    ferryAlt: "Traslado privativo de Buquebus ou Colonia Express",
    logoAlt: "Logo da BT Concierge",
    transfers: {
      ezeiza: { name: "Ezeiza", detail: "Aeroporto Internacional EZE" },
      aeroparque: { name: "Aeroparque", detail: "Aeroporto Jorge Newbery AEP" },
      buquebus: { name: "Terminal fluvial", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "Olá BT Concierge, gostaria de solicitar um traslado.",
      origin: "Origem",
      arrival: "Data e hora da chegada",
      travel: "Voo / barco",
      carrier: "Companhia aérea / marítima",
      passengers: "Passageiros",
      bags: "Malas",
      whatsapp: "WhatsApp do hóspede",
      apartment: "Apartamento / endereço",
      keys: "Entrega das chaves",
      closing: "Fico no aguardo para coordenar o ponto de encontro com o motorista designado.",
    },
  },
} as const;

type Locale = keyof typeof translations;

const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "es", label: "ES" },
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
  { value: "de", label: "DE" },
  { value: "ja", label: "日本語" },
  { value: "pt", label: "PT" },
];

function QuantityControl({
  label,
  value,
  onChange,
  icon: Icon,
  reduceLabel,
  increaseLabel,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: typeof Users;
  reduceLabel: string;
  increaseLabel: string;
}) {
  return (
    <div className="quantity-control">
      <div className="quantity-label">
        <Icon size={18} strokeWidth={1.7} />
        <span>{label}</span>
      </div>
      <div className="stepper" aria-label={label}>
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label={`${reduceLabel} ${label.toLowerCase()}`}
          disabled={value === 0}
        >
          <Minus size={17} />
        </button>
        <output aria-live="polite">{value}</output>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          aria-label={`${increaseLabel} ${label.toLowerCase()}`}
        >
          <Plus size={17} />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("es");
  const [transferId, setTransferId] = useState<TransferId>("ezeiza");
  const [apartmentName, setApartmentName] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [bags, setBags] = useState(1);

  const t = translations[locale];
  const transfer = useMemo(
    () => transfers.find((item) => item.id === transferId) ?? transfers[0],
    [transferId],
  );
  const transferText = t.transfers[transfer.id];
  const selectedApartment = apartments.find((item) => item.name === apartmentName);
  const keyDelivery = selectedApartment?.requiresKey ?? false;
  const total = keyDelivery ? transfer.keyPrice : transfer.price;

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("bt-concierge-locale");
    if (savedLocale && savedLocale in translations) {
      setLocale(savedLocale as Locale);
      document.documentElement.lang = savedLocale;
    }
  }, []);

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("bt-concierge-locale", nextLocale);
    document.documentElement.lang = nextLocale;
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const arrival = String(form.get("arrival") ?? "");
    const travel = String(form.get("flight") ?? "");
    const carrier = String(form.get("airline") ?? "");
    const whatsapp = String(form.get("whatsapp") ?? "");
    const apartment = String(form.get("apartment") ?? "");
    const origin = `${transferText.name} - ${transferText.detail}`;
    const requestData = {
      origin,
      arrival,
      travel,
      carrier,
      passengers,
      bags,
      whatsapp,
      apartment,
      keyDelivery,
      total,
    };

    const message = [
      t.message.greeting,
      "",
      `${t.message.origin}: ${origin}`,
      `${t.message.arrival}: ${arrival}`,
      `${t.message.travel}: ${travel}`,
      `${t.message.carrier}: ${carrier}`,
      `${t.message.passengers}: ${passengers}`,
      `${t.message.bags}: ${bags}`,
      `${t.message.whatsapp}: ${whatsapp}`,
      `${t.message.apartment}: ${apartment}`,
      `${t.message.keys}: ${keyDelivery ? t.yes : t.no}`,
      `${t.total}: USD ${total}`,
      "",
      t.message.closing,
    ].join("\n");

    void fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
      keepalive: true,
    }).catch(() => {
      const bookingPayload = new Blob([JSON.stringify(requestData)], { type: "application/json" });
      navigator.sendBeacon("/api/requests", bookingPayload);
    });

    // The sheet request is independent from whether the guest sends the WhatsApp message.
    window.open(
      `https://wa.me/5491132700931?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main>
      <section className="hero">
        <Image src="/images/hero-airport.webp" alt={t.heroAlt} fill priority className="hero-image" sizes="100vw" />
        <div className="hero-shade" />
        <header className="site-header shell">
          <a className="brand" href="#top" aria-label="BT Concierge">
            <Image src="/images/bt-logo.webp" alt={t.logoAlt} width={96} height={96} priority />
          </a>
          <div className="header-tools">
            <label className="language-picker">
              <span className="sr-only">{t.language}</span>
              <Languages size={17} aria-hidden="true" />
              <select
                value={locale}
                onChange={(event) => changeLocale(event.target.value as Locale)}
                aria-label={t.language}
              >
                {localeOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </label>
            <a className="header-action" href="#reservar">
              {t.reserve} <ChevronRight size={17} />
            </a>
          </div>
        </header>
        <div className="hero-content shell" id="top">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>BT CONCIERGE</h1>
          <p className="hero-copy">{t.heroCopy}</p>
          <a className="primary-link" href="#reservar">{t.request} <ArrowDown size={18} /></a>
        </div>
        <div className="hero-note shell"><MessageCircle size={18} />{t.meeting}</div>
      </section>

      <section className="booking-section" id="reservar">
        <div className="shell booking-heading">
          <div><p className="eyebrow dark">{t.bookingEyebrow}</p><h2>{t.bookingTitle}</h2></div>
          <p>{t.bookingIntro}</p>
        </div>

        <form className="booking-layout shell" onSubmit={submitRequest}>
          <div className="booking-main">
            <fieldset className="transfer-fieldset">
              <legend><span>01</span>{t.fromWhere}</legend>
              <div className="transfer-options">
                {transfers.map((item) => {
                  const Icon = item.icon;
                  const selected = transferId === item.id;
                  const localized = t.transfers[item.id];
                  return (
                    <label className={`transfer-option ${selected ? "selected" : ""}`} key={item.id}>
                      <input type="radio" name="transfer" value={item.id} checked={selected} onChange={() => setTransferId(item.id)} />
                      <span className="option-icon"><Icon size={21} strokeWidth={1.6} /></span>
                      <span className="option-content"><strong>{localized.name}</strong><small>{localized.detail}</small></span>
                      <span className="option-price">USD {item.price}</span>
                      <span className="option-check" aria-hidden="true"><Check size={14} /></span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend><span>02</span>{t.arrivalData}</legend>
              <div className="form-grid">
                <label>{t.whatsapp}<input name="whatsapp" type="tel" placeholder={t.whatsappPlaceholder} required /></label>
                <label>{t.arrival}<input name="arrival" type="datetime-local" required /></label>
                <label>{t.travelNumber}<input name="flight" type="text" placeholder={t.travelPlaceholder} required /></label>
                <label>{t.carrier}<input name="airline" type="text" placeholder={t.carrierPlaceholder} required /></label>
                <label className="full-width">{t.apartment}
                  <select name="apartment" value={apartmentName} onChange={(event) => setApartmentName(event.target.value)} required>
                    <option value="" disabled>{t.apartmentPlaceholder}</option>
                    {apartments.map((apartment) => <option value={apartment.name} key={apartment.name}>{apartment.name}</option>)}
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend><span>03</span>{t.passengersAndBags}</legend>
              <div className="quantities">
                <QuantityControl label={t.passengers} value={passengers} onChange={setPassengers} icon={Users} reduceLabel={t.reduce} increaseLabel={t.increase} />
                <QuantityControl label={t.bags} value={bags} onChange={setBags} icon={Luggage} reduceLabel={t.reduce} increaseLabel={t.increase} />
              </div>
            </fieldset>
          </div>

          <aside className="booking-summary">
            <p className="summary-kicker">{t.yourTransfer}</p>
            <div className="summary-route"><span>{transferText.name}</span><ChevronRight size={18} /><span>{t.apartmentShort}</span></div>
            <div className="summary-details"><div><span>{t.privateTransfer}</span><strong>USD {transfer.price}</strong></div></div>
            <div className="key-toggle">
              <span className="key-copy"><span className="key-icon"><KeyRound size={20} /></span><span><strong>{t.keyDelivery}</strong><small>{t.keyDetail}</small></span></span>
              <span className={`key-status ${selectedApartment ? (keyDelivery ? "required" : "not-required") : "pending"}`} aria-live="polite">
                {selectedApartment ? (keyDelivery ? t.yes : t.no) : "--"}
              </span>
            </div>
            <div className="summary-total"><span>{t.total}</span><strong>USD {total}</strong></div>
            <button className="whatsapp-button" type="submit"><MessageCircle size={19} />{t.send}</button>
            <p className="summary-note">{t.confirmation}</p>
          </aside>
        </form>
      </section>

      <section className="service-story">
        <div className="story-image"><Image src="/images/city-arrival.webp" alt={t.storyAlt} fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="story-copy">
          <p className="eyebrow dark">{t.storyEyebrow}</p><h2>{t.storyTitle}</h2>
          <ol>
            <li><span>1</span><div><strong>{t.story1Title}</strong><p>{t.story1Text}</p></div></li>
            <li><span>2</span><div><strong>{t.story2Title}</strong><p>{t.story2Text}</p></div></li>
            <li><span>3</span><div><strong>{t.story3Title}</strong><p>{t.story3Text}</p></div></li>
          </ol>
        </div>
      </section>

      <section className="rates-section">
        <div className="shell rates-layout">
          <div><p className="eyebrow dark">{t.ratesEyebrow}</p><h2>{t.ratesTitle}</h2></div>
          <div className="rates-table">
            {transfers.map((item) => {
              const localized = t.transfers[item.id];
              return <div className="rate-row" key={item.id}><span>{localized.name}<small>{localized.detail}</small></span><strong>USD {item.price}</strong><span>{t.withKeys}<strong>USD {item.keyPrice}</strong></span></div>;
            })}
          </div>
        </div>
      </section>

      <section className="ferry-band">
        <Image src="/images/ferry-transfer.webp" alt={t.ferryAlt} fill sizes="100vw" />
        <div className="ferry-overlay" />
        <div className="shell ferry-content"><p className="eyebrow">{t.ferryEyebrow}</p><h2>{t.ferryTitle}</h2><a className="primary-link light" href="#reservar">{t.reserveFrom}<ChevronRight size={18} /></a></div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <div className="brand footer-brand"><Image src="/images/bt-logo.webp" alt={t.logoAlt} width={82} height={82} /></div>
          <p>{t.footerCopy}</p>
          <a href="#reservar">{t.reserve}</a>
        </div>
      </footer>
    </main>
  );
}

