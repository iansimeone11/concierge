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

const conciergeWhatsApp = "5491132700931";

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
    bookingIntro: "Selecciona el punto de llegada, completa tus datos y envÃ­a la solicitud por WhatsApp.",
    fromWhere: "Â¿Desde dÃ³nde llegas?",
    arrivalData: "Datos de llegada",
    whatsapp: "NÃºmero de WhatsApp",
    whatsappPlaceholder: "Ej. +54 9 11 1234 5678",
    arrival: "Fecha y hora de llegada",
    travelNumber: "NÃºmero de vuelo / barco",
    travelPlaceholder: "Ej. AR 1301",
    carrier: "AerolÃ­nea / compaÃ±Ã­a",
    carrierPlaceholder: "Ej. AerolÃ­neas Argentinas",
    apartment: "Apartamento / direcciÃ³n de destino",
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
    keyDetail: "Se determina automÃ¡ticamente segÃºn el departamento",
    total: "Total",
    send: "Enviar solicitud",
    confirmation: "La reserva queda sujeta a confirmaciÃ³n por WhatsApp.",
    storyEyebrow: "De la terminal a casa",
    storyTitle: "Una llegada sin vueltas",
    story1Title: "EnvÃ­a tus datos",
    story1Text: "Vuelo, horario, pasajeros y equipaje.",
    story2Title: "Conoce a tu conductor",
    story2Text: "Coordinamos el encuentro directamente por WhatsApp.",
    story3Title: "Llega al apartamento",
    story3Text: "Si hace falta, el conductor tambiÃ©n te entrega las llaves.",
    ratesEyebrow: "Tarifas claras",
    ratesTitle: "Sin sorpresas al llegar",
    withKeys: "Con llaves",
    ferryEyebrow: "TambiÃ©n desde la terminal fluvial",
    ferryTitle: "Buquebus y Colonia Express",
    reserveFrom: "Reservar desde USD 25",
    footerCopy: "Traslados privados y asistencia de llegada en Buenos Aires.",
    yes: "SÃ­",
    no: "No",
    heroAlt: "Chofer de BT Concierge recibiendo a una pasajera en el aeropuerto",
    storyAlt: "RecepciÃ³n de una huÃ©sped frente a su alojamiento en Buenos Aires",
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
      carrier: "AerolÃ­nea / compaÃ±Ã­a",
      passengers: "Pasajeros",
      bags: "Maletas",
      whatsapp: "WhatsApp del huÃ©sped",
      apartment: "Apartamento / direcciÃ³n",
      keys: "Entrega de llaves",
      closing: "Quedo atento/a a la coordinaciÃ³n del punto de encuentro con el conductor asignado.",
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
    carrierPlaceholder: "E.g. AerolÃ­neas Argentinas",
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
    reserve: "RÃ©server le transfert",
    heroEyebrow: "ArrivÃ©es Ã  Buenos Aires",
    heroCopy: "Votre arrivÃ©e, parfaitement organisÃ©e. Transfert privÃ© jusqu'Ã  votre appartement et remise des clÃ©s si nÃ©cessaire.",
    request: "Demander un transfert",
    meeting: "Le point de rendez-vous est coordonnÃ© directement avec votre chauffeur via WhatsApp.",
    bookingEyebrow: "RÃ©servation simple",
    bookingTitle: "Organisez votre arrivÃ©e",
    bookingIntro: "Choisissez votre point d'arrivÃ©e, renseignez vos informations et envoyez la demande via WhatsApp.",
    fromWhere: "D'oÃ¹ arrivez-vous ?",
    arrivalData: "Informations d'arrivÃ©e",
    whatsapp: "NumÃ©ro WhatsApp",
    whatsappPlaceholder: "Ex. +33 6 12 34 56 78",
    arrival: "Date et heure d'arrivÃ©e",
    travelNumber: "NumÃ©ro de vol / bateau",
    travelPlaceholder: "Ex. AR 1301",
    carrier: "Compagnie aÃ©rienne / maritime",
    carrierPlaceholder: "Ex. Air France",
    apartment: "Appartement / adresse de destination",
    apartmentPlaceholder: "SÃ©lectionnez votre appartement",
    passengersAndBags: "Passagers et bagages",
    passengers: "Passagers",
    bags: "Valises",
    reduce: "RÃ©duire",
    increase: "Augmenter",
    yourTransfer: "Votre transfert",
    apartmentShort: "Appartement",
    privateTransfer: "Transfert privÃ©",
    keyDelivery: "Remise des clÃ©s",
    keyDetail: "DÃ©terminÃ© automatiquement selon l'appartement",
    total: "Total",
    send: "Envoyer la demande",
    confirmation: "La rÃ©servation est soumise Ã  confirmation via WhatsApp.",
    storyEyebrow: "Du terminal Ã  votre logement",
    storyTitle: "Une arrivÃ©e en toute sÃ©rÃ©nitÃ©",
    story1Title: "Envoyez vos informations",
    story1Text: "Vol, horaire, passagers et bagages.",
    story2Title: "Rencontrez votre chauffeur",
    story2Text: "Nous coordonnons le rendez-vous directement via WhatsApp.",
    story3Title: "Arrivez Ã  votre appartement",
    story3Text: "Si nÃ©cessaire, le chauffeur vous remet Ã©galement les clÃ©s.",
    ratesEyebrow: "Tarifs transparents",
    ratesTitle: "Aucune surprise Ã  l'arrivÃ©e",
    withKeys: "Avec les clÃ©s",
    ferryEyebrow: "Ã‰galement depuis le terminal fluvial",
    ferryTitle: "Buquebus et Colonia Express",
    reserveFrom: "RÃ©server dÃ¨s 25 USD",
    footerCopy: "Transferts privÃ©s et assistance Ã  l'arrivÃ©e Ã  Buenos Aires.",
    yes: "Oui",
    no: "Non",
    heroAlt: "Chauffeur BT Concierge accueillant une passagÃ¨re Ã  l'aÃ©roport",
    storyAlt: "Accueil d'une voyageuse devant son logement Ã  Buenos Aires",
    ferryAlt: "Transfert privÃ© depuis Buquebus ou Colonia Express",
    logoAlt: "Logo BT Concierge",
    transfers: {
      ezeiza: { name: "Ezeiza", detail: "AÃ©roport international EZE" },
      aeroparque: { name: "Aeroparque", detail: "AÃ©roport Jorge Newbery AEP" },
      buquebus: { name: "Terminal fluvial", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "Bonjour BT Concierge, je souhaite rÃ©server un transfert.",
      origin: "Origine",
      arrival: "Date et heure d'arrivÃ©e",
      travel: "Vol / bateau",
      carrier: "Compagnie",
      passengers: "Passagers",
      bags: "Valises",
      whatsapp: "WhatsApp du voyageur",
      apartment: "Appartement / adresse",
      keys: "Remise des clÃ©s",
      closing: "Je reste disponible pour coordonner le point de rendez-vous avec le chauffeur assignÃ©.",
    },
  },
  de: {
    language: "Sprache",
    reserve: "Transfer buchen",
    heroEyebrow: "Ankunft in Buenos Aires",
    heroCopy: "Ihre Ankunft, bestens organisiert. Privater Transfer zu Ihrem Apartment und SchlÃ¼sselÃ¼bergabe bei Bedarf.",
    request: "Transfer anfragen",
    meeting: "Der Treffpunkt wird direkt mit Ihrem Fahrer Ã¼ber WhatsApp abgestimmt.",
    bookingEyebrow: "Einfache Buchung",
    bookingTitle: "Planen Sie Ihre Ankunft",
    bookingIntro: "WÃ¤hlen Sie Ihren Ankunftsort, geben Sie Ihre Daten ein und senden Sie die Anfrage Ã¼ber WhatsApp.",
    fromWhere: "Wo kommen Sie an?",
    arrivalData: "Ankunftsdaten",
    whatsapp: "WhatsApp-Nummer",
    whatsappPlaceholder: "Z. B. +49 151 23456789",
    arrival: "Ankunftsdatum und Uhrzeit",
    travelNumber: "Flug- / FÃ¤hrnummer",
    travelPlaceholder: "Z. B. AR 1301",
    carrier: "Fluggesellschaft / Reederei",
    carrierPlaceholder: "Z. B. Lufthansa",
    apartment: "Apartment / Zieladresse",
    apartmentPlaceholder: "Apartment auswÃ¤hlen",
    passengersAndBags: "Passagiere und GepÃ¤ck",
    passengers: "Passagiere",
    bags: "Koffer",
    reduce: "Verringern",
    increase: "ErhÃ¶hen",
    yourTransfer: "Ihr Transfer",
    apartmentShort: "Apartment",
    privateTransfer: "Privater Transfer",
    keyDelivery: "SchlÃ¼sselÃ¼bergabe",
    keyDetail: "Wird automatisch anhand des Apartments bestimmt",
    total: "Gesamt",
    send: "Anfrage senden",
    confirmation: "Die Buchung wird Ã¼ber WhatsApp bestÃ¤tigt.",
    storyEyebrow: "Vom Terminal nach Hause",
    storyTitle: "Entspannt ankommen",
    story1Title: "Daten senden",
    story1Text: "Flug, Uhrzeit, Passagiere und GepÃ¤ck.",
    story2Title: "Fahrer kennenlernen",
    story2Text: "Wir stimmen den Treffpunkt direkt Ã¼ber WhatsApp ab.",
    story3Title: "Am Apartment ankommen",
    story3Text: "Bei Bedarf Ã¼bergibt Ihnen der Fahrer auch die SchlÃ¼ssel.",
    ratesEyebrow: "Klare Preise",
    ratesTitle: "Keine Ãœberraschungen bei der Ankunft",
    withKeys: "Mit SchlÃ¼sseln",
    ferryEyebrow: "Auch vom FÃ¤hrterminal",
    ferryTitle: "Buquebus und Colonia Express",
    reserveFrom: "Ab 25 USD buchen",
    footerCopy: "Private Transfers und Ankunftsservice in Buenos Aires.",
    yes: "Ja",
    no: "Nein",
    heroAlt: "BT Concierge Fahrer begrÃ¼ÃŸt einen Gast am Flughafen",
    storyAlt: "Empfang eines Gastes vor der Unterkunft in Buenos Aires",
    ferryAlt: "Privater Transfer von Buquebus oder Colonia Express",
    logoAlt: "BT Concierge Logo",
    transfers: {
      ezeiza: { name: "Ezeiza", detail: "Internationaler Flughafen EZE" },
      aeroparque: { name: "Aeroparque", detail: "Flughafen Jorge Newbery AEP" },
      buquebus: { name: "FÃ¤hrterminal", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "Hallo BT Concierge, ich mÃ¶chte einen Transfer anfragen.",
      origin: "Startpunkt",
      arrival: "Ankunftsdatum und Uhrzeit",
      travel: "Flug / FÃ¤hre",
      carrier: "Fluggesellschaft / Reederei",
      passengers: "Passagiere",
      bags: "Koffer",
      whatsapp: "WhatsApp des Gastes",
      apartment: "Apartment / Adresse",
      keys: "SchlÃ¼sselÃ¼bergabe",
      closing: "Ich freue mich auf die Abstimmung des Treffpunkts mit dem zugewiesenen Fahrer.",
    },
  },
  ja: {
    language: "è¨€èªž",
    reserve: "é€è¿Žã‚’äºˆç´„",
    heroEyebrow: "ãƒ–ã‚¨ãƒŽã‚¹ã‚¢ã‚¤ãƒ¬ã‚¹åˆ°ç€",
    heroCopy: "ã”åˆ°ç€ã‚’ã‚¹ãƒ ãƒ¼ã‚ºã«ã€‚ç©ºæ¸¯ãƒ»æ¸¯ã‹ã‚‰ã‚¢ãƒ‘ãƒ¼ãƒˆã¾ã§ã®å°‚ç”¨é€è¿Žã¨ã€å¿…è¦ã«å¿œã˜ãŸéµã®å—ã‘æ¸¡ã—ã‚’ã”ç”¨æ„ã—ã¾ã™ã€‚",
    request: "é€è¿Žã‚’ç”³ã—è¾¼ã‚€",
    meeting: "å¾…ã¡åˆã‚ã›å ´æ‰€ã¯ã€æ‹…å½“ãƒ‰ãƒ©ã‚¤ãƒãƒ¼ã¨WhatsAppã§ç›´æŽ¥èª¿æ•´ã—ã¾ã™ã€‚",
    bookingEyebrow: "ç°¡å˜äºˆç´„",
    bookingTitle: "åˆ°ç€ã‚’æ‰‹é…ã™ã‚‹",
    bookingIntro: "åˆ°ç€å ´æ‰€ã‚’é¸ã³ã€å¿…è¦äº‹é …ã‚’å…¥åŠ›ã—ã¦WhatsAppã‹ã‚‰ãƒªã‚¯ã‚¨ã‚¹ãƒˆã‚’é€ä¿¡ã—ã¦ãã ã•ã„ã€‚",
    fromWhere: "ã©ã¡ã‚‰ã«åˆ°ç€ã—ã¾ã™ã‹ï¼Ÿ",
    arrivalData: "åˆ°ç€æƒ…å ±",
    whatsapp: "WhatsAppç•ªå·",
    whatsappPlaceholder: "ä¾‹ï¼š+81 90 1234 5678",
    arrival: "åˆ°ç€æ—¥æ™‚",
    travelNumber: "ä¾¿å / èˆ¹ä¾¿ç•ªå·",
    travelPlaceholder: "ä¾‹ï¼šAR 1301",
    carrier: "èˆªç©ºä¼šç¤¾ / èˆ¹ä¼šç¤¾",
    carrierPlaceholder: "ä¾‹ï¼šJapan Airlines",
    apartment: "ã‚¢ãƒ‘ãƒ¼ãƒˆ / ç›®çš„åœ°ä½æ‰€",
    apartmentPlaceholder: "ã‚¢ãƒ‘ãƒ¼ãƒˆã‚’é¸æŠž",
    passengersAndBags: "ä¹—å®¢ã¨è·ç‰©",
    passengers: "ä¹—å®¢",
    bags: "ã‚¹ãƒ¼ãƒ„ã‚±ãƒ¼ã‚¹",
    reduce: "æ¸›ã‚‰ã™",
    increase: "å¢—ã‚„ã™",
    yourTransfer: "é€è¿Žå†…å®¹",
    apartmentShort: "ã‚¢ãƒ‘ãƒ¼ãƒˆ",
    privateTransfer: "å°‚ç”¨é€è¿Ž",
    keyDelivery: "éµã®å—ã‘æ¸¡ã—",
    keyDetail: "é¸æŠžã—ãŸã‚¢ãƒ‘ãƒ¼ãƒˆã«å¿œã˜ã¦è‡ªå‹•åˆ¤å®šã•ã‚Œã¾ã™",
    total: "åˆè¨ˆ",
    send: "ãƒªã‚¯ã‚¨ã‚¹ãƒˆã‚’é€ä¿¡",
    confirmation: "äºˆç´„ã¯WhatsAppã§ã®ç¢ºèªå¾Œã«ç¢ºå®šã—ã¾ã™ã€‚",
    storyEyebrow: "ã‚¿ãƒ¼ãƒŸãƒŠãƒ«ã‹ã‚‰ã”è‡ªå®…ã¸",
    storyTitle: "å®‰å¿ƒã§ã‚¹ãƒ ãƒ¼ã‚ºãªåˆ°ç€",
    story1Title: "æƒ…å ±ã‚’é€ä¿¡",
    story1Text: "ä¾¿åã€åˆ°ç€æ™‚åˆ»ã€ä¹—å®¢æ•°ã€è·ç‰©æ•°ã‚’ã”å…¥åŠ›ãã ã•ã„ã€‚",
    story2Title: "ãƒ‰ãƒ©ã‚¤ãƒãƒ¼ã¨åˆæµ",
    story2Text: "å¾…ã¡åˆã‚ã›å ´æ‰€ã‚’WhatsAppã§ç›´æŽ¥èª¿æ•´ã—ã¾ã™ã€‚",
    story3Title: "ã‚¢ãƒ‘ãƒ¼ãƒˆã¸åˆ°ç€",
    story3Text: "å¿…è¦ãªå ´åˆã¯ã€ãƒ‰ãƒ©ã‚¤ãƒãƒ¼ãŒéµã‚‚ãŠæ¸¡ã—ã—ã¾ã™ã€‚",
    ratesEyebrow: "æ˜Žç¢ºãªæ–™é‡‘",
    ratesTitle: "åˆ°ç€æ™‚ã®è¿½åŠ æ–™é‡‘ãªã—",
    withKeys: "éµã®å—ã‘æ¸¡ã—è¾¼ã¿",
    ferryEyebrow: "ãƒ•ã‚§ãƒªãƒ¼ã‚¿ãƒ¼ãƒŸãƒŠãƒ«ã‹ã‚‰ã‚‚å¯¾å¿œ",
    ferryTitle: "Buquebus / Colonia Express",
    reserveFrom: "25ç±³ãƒ‰ãƒ«ã‹ã‚‰äºˆç´„",
    footerCopy: "ãƒ–ã‚¨ãƒŽã‚¹ã‚¢ã‚¤ãƒ¬ã‚¹ã§ã®å°‚ç”¨é€è¿Žã¨åˆ°ç€ã‚µãƒãƒ¼ãƒˆã€‚",
    yes: "ã¯ã„",
    no: "ã„ã„ãˆ",
    heroAlt: "ç©ºæ¸¯ã§ä¹—å®¢ã‚’è¿Žãˆã‚‹BT Conciergeã®ãƒ‰ãƒ©ã‚¤ãƒãƒ¼",
    storyAlt: "ãƒ–ã‚¨ãƒŽã‚¹ã‚¢ã‚¤ãƒ¬ã‚¹ã®å®¿æ³Šå…ˆå‰ã§ã‚²ã‚¹ãƒˆã‚’è¿Žãˆã‚‹æ§˜å­",
    ferryAlt: "Buquebusã¾ãŸã¯Colonia Expressã‹ã‚‰ã®å°‚ç”¨é€è¿Ž",
    logoAlt: "BT Concierge ãƒ­ã‚´",
    transfers: {
      ezeiza: { name: "ã‚¨ã‚»ã‚¤ã‚µ", detail: "EZEå›½éš›ç©ºæ¸¯" },
      aeroparque: { name: "ã‚¢ã‚¨ãƒ­ãƒ‘ãƒ«ã‚±", detail: "ãƒ›ãƒ«ãƒ˜ãƒ»ãƒ‹ãƒ¥ãƒ¼ãƒ™ãƒªãƒ¼ç©ºæ¸¯ AEP" },
      buquebus: { name: "ãƒ•ã‚§ãƒªãƒ¼ã‚¿ãƒ¼ãƒŸãƒŠãƒ«", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "BT Conciergeæ§˜ã€é€è¿Žã‚’å¸Œæœ›ã—ã¾ã™ã€‚",
      origin: "å‡ºç™ºåœ°",
      arrival: "åˆ°ç€æ—¥æ™‚",
      travel: "ä¾¿å / èˆ¹ä¾¿",
      carrier: "èˆªç©ºä¼šç¤¾ / èˆ¹ä¼šç¤¾",
      passengers: "ä¹—å®¢æ•°",
      bags: "è·ç‰©æ•°",
      whatsapp: "ã‚²ã‚¹ãƒˆã®WhatsApp",
      apartment: "ã‚¢ãƒ‘ãƒ¼ãƒˆ / ä½æ‰€",
      keys: "éµã®å—ã‘æ¸¡ã—",
      closing: "æ‹…å½“ãƒ‰ãƒ©ã‚¤ãƒãƒ¼ã¨ã®å¾…ã¡åˆã‚ã›å ´æ‰€ã®èª¿æ•´ã‚’ãŠé¡˜ã„ã„ãŸã—ã¾ã™ã€‚",
    },
  },
  pt: {
    language: "Idioma",
    reserve: "Reservar traslado",
    heroEyebrow: "Chegadas a Buenos Aires",
    heroCopy: "Sua chegada, resolvida. Traslado privativo atÃ© o apartamento e entrega das chaves quando necessÃ¡rio.",
    request: "Solicitar traslado",
    meeting: "O ponto de encontro Ã© combinado diretamente com o motorista pelo WhatsApp.",
    bookingEyebrow: "Reserva simples",
    bookingTitle: "Organize sua chegada",
    bookingIntro: "Escolha o ponto de chegada, preencha seus dados e envie a solicitaÃ§Ã£o pelo WhatsApp.",
    fromWhere: "De onde vocÃª chega?",
    arrivalData: "Dados da chegada",
    whatsapp: "NÃºmero do WhatsApp",
    whatsappPlaceholder: "Ex. +55 11 91234 5678",
    arrival: "Data e hora da chegada",
    travelNumber: "NÃºmero do voo / barco",
    travelPlaceholder: "Ex. AR 1301",
    carrier: "Companhia aÃ©rea / marÃ­tima",
    carrierPlaceholder: "Ex. LATAM",
    apartment: "Apartamento / endereÃ§o de destino",
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
    send: "Enviar solicitaÃ§Ã£o",
    confirmation: "A reserva estÃ¡ sujeita Ã  confirmaÃ§Ã£o pelo WhatsApp.",
    storyEyebrow: "Do terminal atÃ© sua casa",
    storyTitle: "Uma chegada tranquila",
    story1Title: "Envie seus dados",
    story1Text: "Voo, horÃ¡rio, passageiros e bagagem.",
    story2Title: "Encontre seu motorista",
    story2Text: "Coordenamos o encontro diretamente pelo WhatsApp.",
    story3Title: "Chegue ao apartamento",
    story3Text: "Se necessÃ¡rio, o motorista tambÃ©m entrega as chaves.",
    ratesEyebrow: "Tarifas transparentes",
    ratesTitle: "Sem surpresas na chegada",
    withKeys: "Com as chaves",
    ferryEyebrow: "TambÃ©m a partir do terminal fluvial",
    ferryTitle: "Buquebus e Colonia Express",
    reserveFrom: "Reservar a partir de USD 25",
    footerCopy: "Traslados privativos e assistÃªncia na chegada em Buenos Aires.",
    yes: "Sim",
    no: "NÃ£o",
    heroAlt: "Motorista da BT Concierge recebendo uma passageira no aeroporto",
    storyAlt: "RecepÃ§Ã£o de uma hÃ³spede em frente Ã  hospedagem em Buenos Aires",
    ferryAlt: "Traslado privativo de Buquebus ou Colonia Express",
    logoAlt: "Logo da BT Concierge",
    transfers: {
      ezeiza: { name: "Ezeiza", detail: "Aeroporto Internacional EZE" },
      aeroparque: { name: "Aeroparque", detail: "Aeroporto Jorge Newbery AEP" },
      buquebus: { name: "Terminal fluvial", detail: "Buquebus / Colonia Express" },
    },
    message: {
      greeting: "OlÃ¡ BT Concierge, gostaria de solicitar um traslado.",
      origin: "Origem",
      arrival: "Data e hora da chegada",
      travel: "Voo / barco",
      carrier: "Companhia aÃ©rea / marÃ­tima",
      passengers: "Passageiros",
      bags: "Malas",
      whatsapp: "WhatsApp do hÃ³spede",
      apartment: "Apartamento / endereÃ§o",
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
  { value: "ja", label: "æ—¥æœ¬èªž" },
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
    const message = [
      t.message.greeting,
      "",
      `${t.message.origin}: ${transferText.name} - ${transferText.detail}`,
      `${t.message.arrival}: ${form.get("arrival")}`,
      `${t.message.travel}: ${form.get("flight")}`,
      `${t.message.carrier}: ${form.get("airline")}`,
      `${t.message.passengers}: ${passengers}`,
      `${t.message.bags}: ${bags}`,
      `${t.message.whatsapp}: ${form.get("whatsapp")}`,
      `${t.message.apartment}: ${form.get("apartment")}`,
      `${t.message.keys}: ${keyDelivery ? t.yes : t.no}`,
      `${t.total}: USD ${total}`,
      "",
      t.message.closing,
    ].join("\n");

    window.open(
      `https://wa.me/${conciergeWhatsApp}?text=${encodeURIComponent(message)}`,
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

