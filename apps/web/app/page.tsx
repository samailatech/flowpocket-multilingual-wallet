"use client";

import { useState } from 'react';

const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'zh', label: '中文' },
];

const mainNavHrefs = ['#about-us', '#interest-rates', '#calculators', '/register'];
const footerPrimaryHrefs = ['#personal-banking', '#business-services', '#loan-services', '#about-us'];
const footerSecondaryHrefs = [
  '#footer-contact',
  '#footer-contact',
  '#interest-rates',
  '#calculators',
  '/register',
  '#digital-banking-tools',
  '#digital-banking-tools',
];

type UtilityMenuItem = {
  label: string;
  href?: string;
  children?: UtilityMenuItem[];
};

const utilityMenusByLanguage = {
  en: {
    contact: [
      { label: 'Contact Center', href: '#footer-contact' },
      { label: 'Email Us', href: '#footer-contact' },
      { label: 'Live Chat Support', href: '#live-chat' },
      { label: 'Apply Online', href: '/register' },
    ] satisfies UtilityMenuItem[],
    locations: [
      {
        label: 'Story City Branch',
        href: '#story-city-branch',
        children: [
          { label: '521 Broad St, Story City, IA 50248', href: '#story-city-branch' },
          { label: 'Phone: 515-733-4396', href: '#story-city-branch' },
          { label: 'Lobby Hours: Mon - Fri, 9am - 5pm', href: '#story-city-branch' },
          { label: 'Drive-Up Hours: Mon - Sat', href: '#story-city-branch' },
        ],
      },
      {
        label: 'Garner Branch',
        href: '#garner-branch',
        children: [
          { label: '325 State St, Garner, IA 50438', href: '#garner-branch' },
          { label: 'Phone: 641-923-2801', href: '#garner-branch' },
          { label: 'Lobby Hours: Mon - Fri, 9am - 5pm', href: '#garner-branch' },
          { label: 'Drive-Up Hours: Mon - Sat', href: '#garner-branch' },
        ],
      },
      { label: 'Find a Branch Near You', href: '#footer-contact' },
    ] satisfies UtilityMenuItem[],
  },
  es: {
    contact: [
      { label: 'Centro de contacto', href: '#footer-contact' },
      { label: 'Envíanos un correo', href: '#footer-contact' },
      { label: 'Soporte por chat en vivo', href: '#live-chat' },
      { label: 'Solicitar en línea', href: '/register' },
    ] satisfies UtilityMenuItem[],
    locations: [
      {
        label: 'Sucursal Story City',
        href: '#story-city-branch',
        children: [
          { label: '521 Broad St, Story City, IA 50248', href: '#story-city-branch' },
          { label: 'Teléfono: 515-733-4396', href: '#story-city-branch' },
          { label: 'Horario de lobby: Lun - Vie, 9am - 5pm', href: '#story-city-branch' },
          { label: 'Horario de autoservicio: Lun - Sáb', href: '#story-city-branch' },
        ],
      },
      {
        label: 'Sucursal Garner',
        href: '#garner-branch',
        children: [
          { label: '325 State St, Garner, IA 50438', href: '#garner-branch' },
          { label: 'Teléfono: 641-923-2801', href: '#garner-branch' },
          { label: 'Horario de lobby: Lun - Vie, 9am - 5pm', href: '#garner-branch' },
          { label: 'Horario de autoservicio: Lun - Sáb', href: '#garner-branch' },
        ],
      },
      { label: 'Encuentra una sucursal cercana', href: '#footer-contact' },
    ] satisfies UtilityMenuItem[],
  },
  fr: {
    contact: [
      { label: 'Centre de contact', href: '#footer-contact' },
      { label: 'Envoyez-nous un e-mail', href: '#footer-contact' },
      { label: 'Support par chat en direct', href: '#live-chat' },
      { label: 'Demander en ligne', href: '/register' },
    ] satisfies UtilityMenuItem[],
    locations: [
      {
        label: 'Agence de Story City',
        href: '#story-city-branch',
        children: [
          { label: '521 Broad St, Story City, IA 50248', href: '#story-city-branch' },
          { label: 'Téléphone : 515-733-4396', href: '#story-city-branch' },
          { label: 'Heures du hall : lun - ven, 9h - 17h', href: '#story-city-branch' },
          { label: 'Drive : lun - sam', href: '#story-city-branch' },
        ],
      },
      {
        label: 'Agence de Garner',
        href: '#garner-branch',
        children: [
          { label: '325 State St, Garner, IA 50438', href: '#garner-branch' },
          { label: 'Téléphone : 641-923-2801', href: '#garner-branch' },
          { label: 'Heures du hall : lun - ven, 9h - 17h', href: '#garner-branch' },
          { label: 'Drive : lun - sam', href: '#garner-branch' },
        ],
      },
      { label: 'Trouver une agence près de chez vous', href: '#footer-contact' },
    ] satisfies UtilityMenuItem[],
  },
  de: {
    contact: [
      { label: 'Kontaktzentrum', href: '#footer-contact' },
      { label: 'E-Mail senden', href: '#footer-contact' },
      { label: 'Live-Chat-Support', href: '#live-chat' },
      { label: 'Online beantragen', href: '/register' },
    ] satisfies UtilityMenuItem[],
    locations: [
      {
        label: 'Filiale Story City',
        href: '#story-city-branch',
        children: [
          { label: '521 Broad St, Story City, IA 50248', href: '#story-city-branch' },
          { label: 'Telefon: 515-733-4396', href: '#story-city-branch' },
          { label: 'Schalterzeiten: Mo - Fr, 9 - 17 Uhr', href: '#story-city-branch' },
          { label: 'Drive-Up: Mo - Sa', href: '#story-city-branch' },
        ],
      },
      {
        label: 'Filiale Garner',
        href: '#garner-branch',
        children: [
          { label: '325 State St, Garner, IA 50438', href: '#garner-branch' },
          { label: 'Telefon: 641-923-2801', href: '#garner-branch' },
          { label: 'Schalterzeiten: Mo - Fr, 9 - 17 Uhr', href: '#garner-branch' },
          { label: 'Drive-Up: Mo - Sa', href: '#garner-branch' },
        ],
      },
      { label: 'Filiale in Ihrer Nähe finden', href: '#footer-contact' },
    ] satisfies UtilityMenuItem[],
  },
  pt: {
    contact: [
      { label: 'Central de contato', href: '#footer-contact' },
      { label: 'Envie um e-mail', href: '#footer-contact' },
      { label: 'Suporte por chat ao vivo', href: '#live-chat' },
      { label: 'Solicitar online', href: '/register' },
    ] satisfies UtilityMenuItem[],
    locations: [
      {
        label: 'Agência Story City',
        href: '#story-city-branch',
        children: [
          { label: '521 Broad St, Story City, IA 50248', href: '#story-city-branch' },
          { label: 'Telefone: 515-733-4396', href: '#story-city-branch' },
          { label: 'Horário do lobby: Seg - Sex, 9h - 17h', href: '#story-city-branch' },
          { label: 'Drive-thru: Seg - Sáb', href: '#story-city-branch' },
        ],
      },
      {
        label: 'Agência Garner',
        href: '#garner-branch',
        children: [
          { label: '325 State St, Garner, IA 50438', href: '#garner-branch' },
          { label: 'Telefone: 641-923-2801', href: '#garner-branch' },
          { label: 'Horário do lobby: Seg - Sex, 9h - 17h', href: '#garner-branch' },
          { label: 'Drive-thru: Seg - Sáb', href: '#garner-branch' },
        ],
      },
      { label: 'Encontre uma agência perto de você', href: '#footer-contact' },
    ] satisfies UtilityMenuItem[],
  },
  zh: {
    contact: [
      { label: '联系中心', href: '#footer-contact' },
      { label: '给我们发邮件', href: '#footer-contact' },
      { label: '在线聊天支持', href: '#live-chat' },
      { label: '在线申请', href: '/register' },
    ] satisfies UtilityMenuItem[],
    locations: [
      {
        label: 'Story City 分行',
        href: '#story-city-branch',
        children: [
          { label: '521 Broad St, Story City, IA 50248', href: '#story-city-branch' },
          { label: '电话：515-733-4396', href: '#story-city-branch' },
          { label: '营业厅时间：周一至周五，上午9点至下午5点', href: '#story-city-branch' },
          { label: '车道服务：周一至周六', href: '#story-city-branch' },
        ],
      },
      {
        label: 'Garner 分行',
        href: '#garner-branch',
        children: [
          { label: '325 State St, Garner, IA 50438', href: '#garner-branch' },
          { label: '电话：641-923-2801', href: '#garner-branch' },
          { label: '营业厅时间：周一至周五，上午9点至下午5点', href: '#garner-branch' },
          { label: '车道服务：周一至周六', href: '#garner-branch' },
        ],
      },
      { label: '查找离您最近的分行', href: '#footer-contact' },
    ] satisfies UtilityMenuItem[],
  },
};

const localeData = {
  en: {
    utility: {
      contactUs: 'Contact Us',
      liveChat: 'Live Chat',
      locationsHours: 'Locations/Hours',
      status: 'FDIC-style security',
      selectLanguage: 'Select a Language',
      search: 'Search',
      login: 'Login',
      openAccount: 'Open Account',
    },
    breadcrumb: 'Home / Personal / Digital Banking Services',
    headerLinks: ['About Us', 'Interest Rates', 'Calculators', 'Apply Online'],
    brandCopy: 'Digital banking, wallet transfers, and bill payments in one place.',
    sidebar: {
      title: 'Personal',
      banking: 'Banking',
      loans: 'Loans',
      heading: 'Digital Banking Services',
      additional: 'Additional Services',
      helpHeading: 'How Can We Help?',
      helpNumber: '515-733-4396 | 641-923-2801',
    },
    digitalBankingLinks: [
      'Online and Mobile Banking',
      'Mobile Wallet & P2P',
      'Money Management',
      'Text Banking',
      'Telephone Banking',
      'Card Management',
      'Greenlight',
    ],
    supportLinks: [
      'Email Us',
      'Apply for a loan',
      'Find a branch near you',
      'Career Opportunities',
      'Switch to RSB',
    ],
    hero: {
      eyebrow: 'Digital Wallet & P2P Payment App',
      heading: 'Move money, pay bills, and secure every transfer from one wallet.',
      text:
        'FlowPocket is a recruiter-ready fintech concept with wallet funding, peer payments, transaction PIN, QR receive flows, and real-time updates across web and mobile.',
      trustRibbon: [
        'Encrypted wallet infrastructure',
        'Transfer PIN on every high-risk action',
        'Realtime payment activity monitoring',
      ],
      createAccount: 'Create Account',
      signIn: 'Sign In',
      valueCards: [
        {
          title: 'Trusted Everyday Banking',
          description: 'Fund your wallet, pay bills, and move money with bank-style clarity and fast settlement.',
        },
        {
          title: 'Security You Can Explain',
          description: 'Password login, transaction PIN, and verification-ready identity fields built into the flow.',
        },
        {
          title: 'Designed For Financial Confidence',
          description: 'Clear balances, verified actions, and transaction history that helps users trust every step.',
        },
      ],
      stats: [
        { label: 'Wallet funding success', value: '99.2%' },
        { label: 'Average transfer time', value: '2.1s' },
        { label: 'Test users served', value: '100+' },
      ],
    },
    bankingPanel: {
      kicker: 'Online Banking',
      heading: 'Secure access to your digital wallet.',
      copy: 'Check balances, send money, and manage bills from a single protected login.',
      userId: 'User ID / Email',
      userIdPlaceholder: 'you@example.com',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      login: 'Log In',
      servicesHeading: 'Digital Banking Services',
      servicesCopy:
        'Check out our convenient, digital banking options that provide easy access to your accounts 24/7.',
      needHelp: 'Need help?',
      supportText: 'Call support or visit a branch advisor.',
      applyOnline: 'Apply Online',
    },
    footer: {
      kicker: 'You can rely on us.',
      heading: 'Proudly Serving Story City and Garner Areas',
      social: 'Facebook',
      contactIntro1: 'Call to report fraudulent activity, lost or stolen cards.',
      contactIntro2: 'Help is available 24/7 (for debit cards only).',
      tollFree: 'Toll Free:',
      storyCity: 'Story City:',
      garner: 'Garner:',
      routing: 'Routing Number:',
      contactWire: 'Contact us for wire instructions.',
      storyCityAddress: '521 Broad St, Story City, IA 50248',
      storyCityHours: 'Lobby Hours: Mon - Fri, 9am - 5pm | Drive-Up: Mon - Sat',
      garnerAddress: '325 State St, Garner, IA 50438',
      garnerHours: 'Lobby Hours: Mon - Fri, 9am - 5pm | Drive-Up: Mon - Sat',
      footerPrimaryLinks: ['Personal', 'Business', 'Loans', 'About Us'],
      footerSecondaryLinks: [
        'Contact us',
        'Locations/Hours',
        'Interest Rates',
        'Calculators',
        'Open Account',
        'Download Mobile App',
        'Order Checks',
      ],
      privacyPolicy: 'Privacy Policy',
      copyright: 'Copyright © 2026 Reliance State Bank. All Rights Reserved. Site by Samtech.',
      member: 'Member FDIC Equal Housing Lender',
    },
    chatbot: {
      title: 'FlowPocket Support',
      placeholder: 'Type your message...',
      send: 'Send',
      close: 'Close',
      welcome: 'Welcome to FlowPocket Support! How can we help you today?',
      offline: 'Our support team is offline. Please leave a message and we\'ll get back to you soon.',
      autoReply: 'Thank you for your message. A support agent will respond shortly.',
    },
  },
  es: {
    utility: {
      contactUs: 'Contáctenos',
      liveChat: 'Chat en Vivo',
      locationsHours: 'Ubicaciones/Horario',
      status: 'Seguridad estilo FDIC',
      selectLanguage: 'Seleccione un idioma',
      search: 'Buscar',
      login: 'Iniciar sesión',
      openAccount: 'Abrir Cuenta',
    },
    breadcrumb: 'Inicio / Personal / Servicios de Banca Digital',
    headerLinks: ['Sobre Nosotros', 'Tasas de Interés', 'Calculadoras', 'Solicitar en Línea'],
    brandCopy: 'Banca digital, transferencias de billetera y pagos de facturas en un solo lugar.',
    sidebar: {
      title: 'Personal',
      banking: 'Banca',
      loans: 'Préstamos',
      heading: 'Servicios de Banca Digital',
      additional: 'Servicios Adicionales',
      helpHeading: '¿Cómo Podemos Ayudar?',
      helpNumber: '515-733-4396 | 641-923-2801',
    },
    digitalBankingLinks: [
      'Banca en Línea y Móvil',
      'Monedero Móvil y P2P',
      'Gestión de Dinero',
      'Banca por Texto',
      'Banca Telefónica',
      'Gestión de Tarjetas',
      'Greenlight',
    ],
    supportLinks: [
      'Envíanos un correo',
      'Solicitar un préstamo',
      'Encuentra una sucursal cerca de ti',
      'Oportunidades de carrera',
      'Cámbiate a RSB',
    ],
    hero: {
      eyebrow: 'Aplicación de billetera digital y pagos P2P',
      heading: 'Mueve dinero, paga facturas y asegura cada transferencia desde una sola billetera.',
      text:
        'FlowPocket es un concepto fintech listo para reclutar con financiamiento de billetera, pagos entre pares, PIN de transacción, flujos QR de recepción y actualizaciones en tiempo real en web y móvil.',
      trustRibbon: [
        'Infraestructura de billetera encriptada',
        'PIN de transferencia en cada acción de alto riesgo',
        'Monitoreo de actividad de pago en tiempo real',
      ],
      createAccount: 'Crear Cuenta',
      signIn: 'Iniciar sesión',
      valueCards: [
        {
          title: 'Banca confiable para el día a día',
          description: 'Financie tu billetera, pague facturas y mueva dinero con claridad estilo bancario y liquidación rápida.',
        },
        {
          title: 'Seguridad que puedes explicar',
          description: 'Inicio de sesión con contraseña, PIN de transacción y campos prontos para la verificación integrados en el flujo.',
        },
        {
          title: 'Diseñado para la confianza financiera',
          description: 'Saldos claros, acciones verificadas e historial de transacciones que ayudan a los usuarios a confiar en cada paso.',
        },
      ],
      stats: [
        { label: 'Éxito de financiamiento de billetera', value: '99.2%' },
        { label: 'Tiempo promedio de transferencia', value: '2.1s' },
        { label: 'Usuarios de prueba atendidos', value: '100+' },
      ],
    },
    bankingPanel: {
      kicker: 'Banca en Línea',
      heading: 'Acceso seguro a tu billetera digital.',
      copy: 'Revisa saldos, envía dinero y administra facturas desde un único inicio de sesión protegido.',
      userId: 'ID de usuario / Correo',
      userIdPlaceholder: 'tú@ejemplo.com',
      password: 'Contraseña',
      passwordPlaceholder: 'Ingrese su contraseña',
      rememberMe: 'Recuérdame',
      forgotPassword: '¿Olvidaste tu contraseña?',
      login: 'Iniciar sesión',
      servicesHeading: 'Servicios de Banca Digital',
      servicesCopy: 'Revisa nuestras opciones de banca digital convenientes que brindan fácil acceso a tus cuentas las 24/7.',
      needHelp: '¿Necesitas ayuda?',
      supportText: 'Llama al soporte o visita a un asesor de sucursal.',
      applyOnline: 'Solicitar en Línea',
    },
    footer: {
      kicker: 'Puedes contar con nosotros.',
      heading: 'Orgullosamente sirviendo a Story City y las áreas de Garner',
      social: 'Facebook',
      contactIntro1: 'Llama para reportar actividad fraudulenta, tarjetas perdidas o robadas.',
      contactIntro2: 'La ayuda está disponible 24h/24 y 7j/7 (solo para tarjetas de débito).',
      tollFree: 'Llamada gratuita:',
      storyCity: 'Story City:',
      garner: 'Garner:',
      routing: 'Número de ruta:',
      contactWire: 'Contáctanos para instrucciones de transferencia.',
      storyCityAddress: '521 Broad St, Story City, IA 50248',
      storyCityHours: 'Horario de lobby: Lun - Vie, 9am - 5pm | Autoservicio: Lun - Sáb',
      garnerAddress: '325 State St, Garner, IA 50438',
      garnerHours: 'Horario de lobby: Lun - Vie, 9am - 5pm | Autoservicio: Lun - Sáb',
      footerPrimaryLinks: ['Personal', 'Empresas', 'Préstamos', 'Sobre Nosotros'],
      footerSecondaryLinks: [
        'Contáctanos',
        'Ubicaciones/Horario',
        'Tasas de Interés',
        'Calculadoras',
        'Abrir Cuenta',
        'Descargar App Móvil',
        'Ordenar Cheques',
      ],
      privacyPolicy: 'Política de Privacidad',
      copyright: 'Copyright © 2026 Reliance State Bank. Todos los derechos reservados. Sitio por Samtech.',
      member: 'Miembro FDIC Igualdad de Vivienda Prestamista',
    },
    chatbot: {
      title: 'Soporte de FlowPocket',
      placeholder: 'Escribe tu mensaje...',
      send: 'Enviar',
      close: 'Cerrar',
      welcome: '¡Bienvenido al soporte de FlowPocket! ¿Cómo podemos ayudarte hoy?',
      offline: 'Nuestro equipo de soporte está fuera de línea. Por favor, deja un mensaje y nos comunicaremos contigo pronto.',
      autoReply: 'Gracias por tu mensaje. Un agente de soporte responderá en breve.',
    },
  },
  fr: {
    utility: {
      contactUs: 'Nous contacter',
      liveChat: 'Chat en Direct',
      locationsHours: 'Lieux/Horaires',
      status: 'Sécurité de type FDIC',
      selectLanguage: 'Sélectionnez une langue',
      search: 'Rechercher',
      login: 'Connexion',
      openAccount: 'Ouvrir un compte',
    },
    breadcrumb: 'Accueil / Personnel / Services bancaires numériques',
    headerLinks: ['À propos', 'Taux d\'intérêt', 'Calculatrices', 'Demander en ligne'],
    brandCopy: 'Banque numérique, transferts de portefeuille et paiements de factures en un seul endroit.',
    sidebar: {
      title: 'Personnel',
      banking: 'Banque',
      loans: 'Prêts',
      heading: 'Services bancaires numériques',
      additional: 'Services supplémentaires',
      helpHeading: 'Comment pouvons-nous aider?',
      helpNumber: '515-733-4396 | 641-923-2801',
    },
    digitalBankingLinks: [
      'Banque en ligne et mobile',
      'Portefeuille mobile & P2P',
      'Gestion d\'argent',
      'Banque par SMS',
      'Banque téléphonique',
      'Gestion de carte',
      'Greenlight',
    ],
    supportLinks: [
      'Envoyez-nous un e-mail',
      'Demander un prêt',
      'Trouvez une agence près de chez vous',
      'Opportunités de carrière',
      'Passez à RSB',
    ],
    hero: {
      eyebrow: 'Application de portefeuille numérique et paiements P2P',
      heading: 'Déplacez de l\'argent, payez des factures et sécurisez chaque transfert à partir d\'un seul portefeuille.',
      text:
        'FlowPocket est un concept fintech prêt pour le recrutement avec financement de portefeuille, paiements entre pairs, code PIN de transaction, flux de réception QR et mises à jour en temps réel sur le web et le mobile.',
      trustRibbon: [
        'Infrastructure de portefeuille cryptée',
        'Code PIN de transfert pour chaque action à haut risque',
        'Surveillance en temps réel de l\'activité de paiement',
      ],
      createAccount: 'Créer un compte',
      signIn: 'Se connecter',
      valueCards: [
        {
          title: 'Banque de tous les jours fiable',
          description: 'Financez votre portefeuille, payez des factures et déplacez de l\'argent avec la clarité d\'une banque et un règlement rapide.',
        },
        {
          title: 'Sécurité que vous pouvez expliquer',
          description: 'Connexion par mot de passe, code PIN de transaction et champs prêts pour la vérification intégrés au flux.',
        },
        {
          title: 'Conçu pour la confiance financière',
          description: 'Soldes clairs, actions vérifiées et historique des transactions qui aident les utilisateurs à faire confiance à chaque étape.',
        },
      ],
      stats: [
        { label: 'Succès de financement du portefeuille', value: '99.2%' },
        { label: 'Temps moyen de transfert', value: '2.1s' },
        { label: 'Utilisateurs de test servis', value: '100+' },
      ],
    },
    bankingPanel: {
      kicker: 'Banque en ligne',
      heading: 'Accès sécurisé à votre portefeuille numérique.',
      copy: 'Vérifiez les soldes, envoyez de l\'argent et gérez les factures depuis une seule connexion protégée.',
      userId: 'ID utilisateur / Email',
      userIdPlaceholder: 'vous@example.com',
      password: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      login: 'Se connecter',
      servicesHeading: 'Services bancaires numériques',
      servicesCopy: 'Découvrez nos options bancaires numériques pratiques qui offrent un accès facile à vos comptes 24h/24 et 7j/7.',
      needHelp: 'Besoin d\'aide?',
      supportText: 'Appelez le support ou rendez-vous chez un conseiller d\'agence.',
      applyOnline: 'Demander en ligne',
    },
    footer: {
      kicker: 'Vous pouvez compter sur nous.',
      heading: 'Fièrement au service de Story City et des zones de Garner',
      social: 'Facebook',
      contactIntro1: 'Appelez pour signaler une activité frauduleuse, une carte perdue ou volée.',
      contactIntro2: 'L\'aide est disponible 24h/24 et 7j/7 (pour les cartes de débit seulement).',
      tollFree: 'Numéro vert :',
      storyCity: 'Story City :',
      garner: 'Garner :',
      routing: 'Numéro de routage :',
      contactWire: 'Contactez-nous pour les instructions de virement.',
      storyCityAddress: '521 Broad St, Story City, IA 50248',
      storyCityHours: 'Heures du hall : lun - ven, 9h - 17h | Drive : lun - sam',
      garnerAddress: '325 State St, Garner, IA 50438',
      garnerHours: 'Heures du hall : lun - ven, 9h - 17h | Drive : lun - sam',
      footerPrimaryLinks: ['Personnel', 'Entreprises', 'Prêts', 'À propos'],
      footerSecondaryLinks: [
        'Contactez-nous',
        'Ubicaciones/Horaires',
        'Tasas de Interés',
        'Calculatrices',
        'Ouvrir un compte',
        'Télécharger l\'application mobile',
        'Commander des chèques',
      ],
      privacyPolicy: 'Politique de confidentialité',
      copyright: 'Copyright © 2026 Reliance State Bank. Tous droits réservés. Site par Samtech.',
      member: 'Membre FDIC Prêteur de logement égalitaire',
    },
    chatbot: {
      title: 'Support FlowPocket',
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      close: 'Fermer',
      welcome: 'Bienvenue au support FlowPocket! Comment pouvons-nous vous aider?',
      offline: 'Notre équipe d\'assistance est hors ligne. Veuillez laisser un message et nous répondrons bientôt.',
      autoReply: 'Merci pour votre message. Un agent du support vous répondra sous peu.',
    },
  },
  de: {
    utility: {
      contactUs: 'Kontakt',
      liveChat: 'Live-Chat',
      locationsHours: 'Standorte/Öffnungszeiten',
      status: 'FDIC-ähnliche Sicherheit',
      selectLanguage: 'Wählen Sie eine Sprache',
      search: 'Suchen',
      login: 'Anmelden',
      openAccount: 'Konto eröffnen',
    },
    breadcrumb: 'Start / Privat / Digitale Bankdienstleistungen',
    headerLinks: ['Über uns', 'Zinssätze', 'Rechner', 'Online beantragen'],
    brandCopy: 'Digitales Banking, Wallet-Transfers und Rechnungszahlungen an einem Ort.',
    sidebar: {
      title: 'Privat',
      banking: 'Banking',
      loans: 'Kredite',
      heading: 'Digitale Bankdienstleistungen',
      additional: 'Zusätzliche Dienstleistungen',
      helpHeading: 'Wie können wir helfen?',
      helpNumber: '515-733-4396 | 641-923-2801',
    },
    digitalBankingLinks: [
      'Online- und Mobile-Banking',
      'Mobile Wallet & P2P',
      'Geldmanagement',
      'Text-Banking',
      'Telefonbanking',
      'Kartenverwaltung',
      'Greenlight',
    ],
    supportLinks: [
      'E-Mail senden',
      'Einen Kredit beantragen',
      'Finden Sie eine Filiale in Ihrer Nähe',
      'Karrieremöglichkeiten',
      'Wechseln Sie zu RSB',
    ],
    hero: {
      eyebrow: 'Digitale Wallet- und P2P-Zahlungs-App',
      heading: 'Bewege Geld, bezahle Rechnungen und sichere jede Überweisung aus einer Wallet.',
      text:
        'FlowPocket ist ein recruiter-fähiges Fintech-Konzept mit Wallet-Finanzierung, Peer-Zahlungen, Transaktions-PIN, QR-Empfangs-Flows und Echtzeit-Updates für Web und Mobil.',
      trustRibbon: [
        'Verschlüsselte Wallet-Infrastruktur',
        'Transaktions-PIN bei jeder risikoreichen Aktion',
        'Echtzeit-Überwachung der Zahlungsaktivität',
      ],
      createAccount: 'Konto erstellen',
      signIn: 'Anmelden',
      valueCards: [
        {
          title: 'Vertrauenswürdiges Alltagsbanking',
          description: 'Finanziere deine Wallet, bezahle Rechnungen und verschiebe Geld mit bankartiger Klarheit und schneller Abwicklung.',
        },
        {
          title: 'Sicherheit, die du erklären kannst',
          description: 'Passwort-Login, Transaktions-PIN und verifizierungsbereite Identitätsfelder im Flow.',
        },
        {
          title: 'Entwickelt für finanzielle Sicherheit',
          description: 'Klare Kontostände, verifizierte Aktionen und Transaktionsverlauf, der den Nutzern Vertrauen gibt.',
        },
      ],
      stats: [
        { label: 'Wallet-Finanzierungserfolg', value: '99.2%' },
        { label: 'Durchschnittliche Überweisungszeit', value: '2.1s' },
        { label: 'Testnutzer bedient', value: '100+' },
      ],
    },
    bankingPanel: {
      kicker: 'Online-Banking',
      heading: 'Sicherer Zugriff auf dein digitales Wallet.',
      copy: 'Überprüfe Kontostände, sende Geld und verwalte Rechnungen über ein einziges geschütztes Login.',
      userId: 'Benutzer-ID / E-Mail',
      userIdPlaceholder: 'du@beispiel.de',
      password: 'Passwort',
      passwordPlaceholder: 'Gib dein Passwort ein',
      rememberMe: 'Angemeldet bleiben',
      forgotPassword: 'Passwort vergessen?',
      login: 'Anmelden',
      servicesHeading: 'Digitale Bankdienstleistungen',
      servicesCopy: 'Entdecke unsere praktischen digitalen Bankoptionen, die einfachen Zugang zu deinen Konten rund um die Uhr bieten.',
      needHelp: 'Brauchen Sie Hilfe?',
      supportText: 'Rufen Sie den Support an oder besuchen Sie einen Filialberater.',
      applyOnline: 'Online beantragen',
    },
    footer: {
      kicker: 'Sie können sich auf uns verlassen.',
      heading: 'Stolz im Dienst von Story City und Garner Gebieten',
      social: 'Facebook',
      contactIntro1: 'Rufen Sie an, um betrügerische Aktivitäten oder verlorene/gestohlene Karten zu melden.',
      contactIntro2: 'Hilfe ist rund um die Uhr verfügbar (nur für Debitkarten).',
      tollFree: 'Gebührenfrei:',
      storyCity: 'Story City:',
      garner: 'Garner:',
      routing: 'Routing-Nummer:',
      contactWire: 'Kontaktieren Sie uns für Anweisungen zur Überweisung.',
      storyCityAddress: '521 Broad St, Story City, IA 50248',
      storyCityHours: 'Schalterzeiten: Mo - Fr, 9 - 17 Uhr | Drive-Up: Mo - Sa',
      garnerAddress: '325 State St, Garner, IA 50438',
      garnerHours: 'Schalterzeiten: Mo - Fr, 9 - 17 Uhr | Drive-Up: Mo - Sa',
      footerPrimaryLinks: ['Privat', 'Geschäftlich', 'Kredite', 'Über uns'],
      footerSecondaryLinks: [
        'Kontakt',
        'Standorte/Öffnungszeiten',
        'Zinssätze',
        'Rechner',
        'Konto eröffnen',
        'Mobile App herunterladen',
        'Schecks bestellen',
      ],
      privacyPolicy: 'Datenschutzbestimmungen',
      copyright: 'Copyright © 2026 Reliance State Bank. Alle Rechte vorbehalten. Seite von Samtech.',
      member: 'Mitglied FDIC Gleichberechtigter Wohnungsgeber',
    },
    chatbot: {
      title: 'FlowPocket-Unterstützung',
      placeholder: 'Geben Sie Ihre Nachricht ein...',
      send: 'Senden',
      close: 'Schließen',
      welcome: 'Willkommen beim FlowPocket-Support! Wie können wir dir heute helfen?',
      offline: 'Unser Support-Team ist offline. Bitte hinterlassen Sie eine Nachricht und wir melden uns bald bei Ihnen.',
      autoReply: 'Vielen Dank für Ihre Nachricht. Ein Support-Mitarbeiter wird sich in Kürze bei Ihnen melden.',
    },
  },
  pt: {
    utility: {
      contactUs: 'Fale Conosco',
      liveChat: 'Chat ao Vivo',
      locationsHours: 'Locais/Horário',
      status: 'Segurança estilo FDIC',
      selectLanguage: 'Selecione um idioma',
      search: 'Buscar',
      login: 'Entrar',
      openAccount: 'Abrir Conta',
    },
    breadcrumb: 'Início / Pessoal / Serviços Bancários Digitais',
    headerLinks: ['Sobre Nós', 'Taxas de Juros', 'Calculadoras', 'Solicitar Online'],
    brandCopy: 'Banco digital, transferências de carteira e pagamentos de contas em um só lugar.',
    sidebar: {
      title: 'Pessoal',
      banking: 'Banco',
      loans: 'Empréstimos',
      heading: 'Serviços Bancários Digitais',
      additional: 'Serviços Adicionais',
      helpHeading: 'Como podemos ajudar?',
      helpNumber: '515-733-4396 | 641-923-2801',
    },
    digitalBankingLinks: [
      'Banco Online e Móvel',
      'Carteira Móvel & P2P',
      'Gerenciamento de Dinheiro',
      'Banco por Texto',
      'Banco Telefônico',
      'Gerenciamento de Cartão',
      'Greenlight',
    ],
    supportLinks: [
      'Envie um e-mail',
      'Solicitar um empréstimo',
      'Encontre uma agência perto de você',
      'Oportunidades de carreira',
      'Mude para RSB',
    ],
    hero: {
      eyebrow: 'Aplicativo de carteira digital e pagamentos P2P',
      heading: 'Mova dinheiro, pague contas e proteja cada transferência de uma única carteira.',
      text:
        'FlowPocket é um conceito fintech pronto para recrutamento com financiamento de carteira, pagamentos entre pares, PIN de transação, fluxos de recebimento QR e atualizações em tempo real na web e no móvel.',
      trustRibbon: [
        'Infraestrutura de carteira criptografada',
        'PIN de transferência em cada ação de alto risco',
        'Monitoramento de atividade de pagamento em tempo real',
      ],
      createAccount: 'Criar Conta',
      signIn: 'Entrar',
      valueCards: [
        {
          title: 'Banco diário confiável',
          description: 'Financie sua carteira, pague contas e mova dinheiro com clareza bancária e liquidação rápida.',
        },
        {
          title: 'Segurança que você pode explicar',
          description: 'Login por senha, PIN de transação e campos prontos para verificação integrados ao fluxo.',
        },
        {
          title: 'Projetado para confiança financeira',
          description: 'Saldos claros, ações verificadas e histórico de transações que ajudam os usuários a confiar em cada etapa.',
        },
      ],
      stats: [
        { label: 'Sucesso de financiamento da carteira', value: '99.2%' },
        { label: 'Tempo médio de transferência', value: '2.1s' },
        { label: 'Usuários de teste atendidos', value: '100+' },
      ],
    },
    bankingPanel: {
      kicker: 'Banco Online',
      heading: 'Acesso seguro à sua carteira digital.',
      copy: 'Confira saldos, envie dinheiro e gerencie contas a partir de um único login protegido.',
      userId: 'ID de usuário / Email',
      userIdPlaceholder: 'voce@exemplo.com',
      password: 'Senha',
      passwordPlaceholder: 'Digite sua senha',
      rememberMe: 'Lembrar-me',
      forgotPassword: 'Esqueceu a senha?',
      login: 'Entrar',
      servicesHeading: 'Serviços Bancários Digitais',
      servicesCopy: 'Confira nossas opções convenientes de banco digital que fornecem fácil acesso às suas contas 24/7.',
      needHelp: 'Precisa de ajuda?',
      supportText: 'Ligue para o suporte ou visite um consultor de agência.',
      applyOnline: 'Solicitar Online',
    },
    footer: {
      kicker: 'Você pode contar conosco.',
      heading: 'Orgulhosamente servindo Story City e áreas de Garner',
      social: 'Facebook',
      contactIntro1: 'Ligue para relatar atividade fraudulenta, cartões perdidos ou roubados.',
      contactIntro2: 'Ajuda disponível 24/7 (apenas para cartões de débito).',
      tollFree: 'Ligação gratuita:',
      storyCity: 'Story City:',
      garner: 'Garner:',
      routing: 'Número de roteamento:',
      contactWire: 'Entre em contato para instruções de transferência.',
      storyCityAddress: '521 Broad St, Story City, IA 50248',
      storyCityHours: 'Horário do lobby: Seg - Sex, 9h - 17h | Drive-thru: Seg - Sáb',
      garnerAddress: '325 State St, Garner, IA 50438',
      garnerHours: 'Horário do lobby: Seg - Sex, 9h - 17h | Drive-thru: Seg - Sáb',
      footerPrimaryLinks: ['Pessoal', 'Negócios', 'Empréstimos', 'Sobre Nós'],
      footerSecondaryLinks: [
        'Contate-nos',
        'Locais/Horário',
        'Taxas de Juros',
        'Calculadoras',
        'Abrir Conta',
        'Baixar App Móvel',
        'Pedir Cheques',
      ],
      privacyPolicy: 'Política de Privacidade',
      copyright: 'Copyright © 2026 Reliance State Bank. Todos os direitos reservados. Site por Samtech.',
      member: 'Membro FDIC Credor de Habitação Igualitária',
    },
    chatbot: {
      title: 'Suporte FlowPocket',
      placeholder: 'Digite sua mensagem...',
      send: 'Enviar',
      close: 'Fechar',
      welcome: 'Bem-vindo ao suporte FlowPocket! Como podemos ajudá-lo hoje?',
      offline: 'Nossa equipe de suporte está offline. Por favor, deixe uma mensagem e entraremos em contato em breve.',
      autoReply: 'Obrigado pela sua mensagem. Um agente de suporte responderá em breve.',
    },
  },
  zh: {
    utility: {
      contactUs: '联系我们',
      liveChat: '在线聊天',
      locationsHours: '地点/时间',
      status: '类似 FDIC 的安全性',
      selectLanguage: '选择一种语言',
      search: '搜索',
      login: '登录',
      openAccount: '开户',
    },
    breadcrumb: '首页 / 个人 / 数字银行服务',
    headerLinks: ['关于我们', '利率', '计算器', '在线申请'],
    brandCopy: '数字银行、钱包转账和账单支付于一体。',
    sidebar: {
      title: '个人',
      banking: '银行业务',
      loans: '贷款',
      heading: '数字银行服务',
      additional: '附加服务',
      helpHeading: '我们如何帮助您？',
      helpNumber: '515-733-4396 | 641-923-2801',
    },
    digitalBankingLinks: [
      '在线和移动银行',
      '移动钱包与 P2P',
      '资金管理',
      '短信银行',
      '电话银行',
      '卡片管理',
      'Greenlight',
    ],
    supportLinks: [
      '给我们发邮件',
      '申请贷款',
      '查找附近分行',
      '职业机会',
      '切换到 RSB',
    ],
    hero: {
      eyebrow: '数字钱包和 P2P 支付应用',
      heading: '移动资金、支付账单，并从一个钱包保护每笔转账。',
      text:
        'FlowPocket 是一个招聘就绪的金融科技概念，具有钱包资金、点对点支付、交易 PIN、二维码接收流程以及跨 Web 和移动的实时更新。',
      trustRibbon: [
        '加密钱包基础设施',
        '每次高风险操作的转账 PIN',
        '实时支付活动监控',
      ],
      createAccount: '创建账户',
      signIn: '登录',
      valueCards: [
        {
          title: '值得信赖的日常银行',
          description: '为您的钱包提供资金、支付账单并以银行风格的清晰度和快速结算移动资金。',
        },
        {
          title: '可解释的安全性',
          description: '密码登录、交易 PIN 和可验证的身份字段内置于流程中。',
        },
        {
          title: '为财务信心而设计',
          description: '清晰的余额、已验证的操作和交易历史，帮助用户信任每一步。',
        },
      ],
      stats: [
        { label: '钱包资金成功率', value: '99.2%' },
        { label: '平均转账时间', value: '2.1s' },
        { label: '测试用户服务', value: '100+' },
      ],
    },
    bankingPanel: {
      kicker: '在线银行',
      heading: '安全访问您的数字钱包。',
      copy: '从一个受保护的登录检查余额、发送资金并管理账单。',
      userId: '用户 ID / 电子邮件',
      userIdPlaceholder: '你@example.com',
      password: '密码',
      passwordPlaceholder: '输入您的密码',
      rememberMe: '记住我',
      forgotPassword: '忘记密码?',
      login: '登录',
      servicesHeading: '数字银行服务',
      servicesCopy: '查看我们的便捷数字银行选项，全天候 24/7 轻松访问您的账户。',
      needHelp: '需要帮助?',
      supportText: '致电支持或访问分行顾问。',
      applyOnline: '在线申请',
    },
    footer: {
      kicker: '您可以信赖我们。',
      heading: '自豪地为 Story City 和 Garner 地区服务',
      social: 'Facebook',
      contactIntro1: '致电报告欺诈活动、遗失或被盗卡。',
      contactIntro2: '24/7 提供帮助（仅限借记卡）。',
      tollFree: '免费电话：',
      storyCity: 'Story City：',
      garner: 'Garner：',
      routing: '汇款路由号：',
      contactWire: '联系我们获取电汇说明。',
      storyCityAddress: '521 Broad St, Story City, IA 50248',
      storyCityHours: '营业厅时间：周一至周五，上午9点至下午5点 | 车道服务：周一至周六',
      garnerAddress: '325 State St, Garner, IA 50438',
      garnerHours: '营业厅时间：周一至周五，上午9点至下午5点 | 车道服务：周一至周六',
      footerPrimaryLinks: ['个人', '商业', '贷款', '关于我们'],
      footerSecondaryLinks: [
        '联系我们',
        '地点/时间',
        '利率',
        '计算器',
        '开户',
        '下载移动应用',
        '订购支票',
      ],
      privacyPolicy: '隐私政策',
      copyright: 'Copyright © 2026 Reliance State Bank. 版权所有。网站由 Samtech 制作。',
      member: 'FDIC 成员 平等住房贷款人',
    },
    chatbot: {
      title: 'FlowPocket 支持',
      placeholder: '输入您的消息...',
      send: '发送',
      close: '关闭',
      welcome: '欢迎来到 FlowPocket 支持！我们今天如何帮助您？',
      offline: '我们的支持团队离线。请留下一条消息，我们会尽快与您联系。',
      autoReply: '感谢您的留言。支持专员将很快回复您。',
    },
  },
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: localeData.en.chatbot.welcome, sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const localeKey = selectedLanguage as keyof typeof localeData;
  const locale = localeData[localeKey] || localeData.en;
  const utilityMenus = utilityMenusByLanguage[localeKey] || utilityMenusByLanguage.en;

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: localeData[localeKey].chatbot.autoReply,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleLanguageChange = (newLang: string) => {
    setSelectedLanguage(newLang);
    setMessages([
      {
        id: 1,
        text: localeData[newLang as keyof typeof localeData].chatbot.welcome,
        sender: 'bot',
      },
    ]);
  };

  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="utility-bar">
          <div className="utility-links">
            <div className="utility-dropdown">
              <button type="button" className="utility-link utility-trigger">
                {locale.utility.contactUs}
              </button>
              <div className="utility-menu">
                {utilityMenus.contact.map((item) => (
                  <a key={item.label} href={item.href} className="utility-menu-item">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="utility-dropdown">
              <button type="button" className="utility-link utility-trigger">
                {locale.utility.locationsHours}
              </button>
              <div className="utility-menu">
                {utilityMenus.locations.map((item) => (
                  item.children ? (
                    <div key={item.label} className="utility-menu-submenu">
                      <a href={item.href} className="utility-menu-item utility-menu-parent">
                        {item.label}
                      </a>
                      <div className="utility-submenu-panel">
                        {item.children.map((child) => (
                          <a key={child.label} href={child.href} className="utility-menu-item utility-submenu-item">
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a key={item.label} href={item.href} className="utility-menu-item">
                      {item.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
          <div className="utility-meta">
            <span className="status-pill">{locale.utility.status}</span>
            <label className="header-language">
              <span className="sr-only">{locale.utility.selectLanguage}</span>
              <select
                value={selectedLanguage}
                onChange={(event) => handleLanguageChange(event.target.value)}
                aria-label={locale.utility.selectLanguage}
              >
                {languageOptions.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="main-nav-bar">
          <div className="brand-block">
            <a href="/" className="brand-mark">
              <img src="/flowpocket-logo.svg" alt="FlowPocket logo" className="brand-logo" />
              <span>FlowPocket</span>
            </a>
            <p className="brand-copy">{locale.brandCopy}</p>
          </div>

          <nav className="header-nav" aria-label="Primary">
            {locale.headerLinks.map((link, index) => (
              <a key={link} href={mainNavHrefs[index]} className="header-link">
                {link}
              </a>
            ))}
          </nav>

          <div className="header-actions-bar">
            <button type="button" className="header-search" aria-label={locale.utility.search}>
              {locale.utility.search}
            </button>
            <a href="/login" className="header-login">
              {locale.utility.login}
            </a>
            <a href="/register" className="header-apply">
              {locale.utility.openAccount}
            </a>
          </div>
        </div>
      </header>

      <div className="breadcrumb-row">
        <p>{locale.breadcrumb}</p>
      </div>

      <div className="content-layout">
        <aside className="left-sidebar">
          <div className="sidebar-card">
            <p className="sidebar-title">{locale.sidebar.title}</p>
            <div className="sidebar-group">
              <a href="#personal-banking" className="sidebar-link">
                {locale.sidebar.banking}
              </a>
              <a href="#loan-services" className="sidebar-link">
                {locale.sidebar.loans}
              </a>
            </div>

            <div className="sidebar-group">
              <p className="sidebar-heading">{locale.sidebar.heading}</p>
              <div className="sidebar-subgroup">
                {locale.digitalBankingLinks.map((link) => (
                  <a
                    key={link}
                    href="#digital-banking-tools"
                    className={`sidebar-link ${link === locale.digitalBankingLinks[1] ? 'active' : ''}`}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div className="sidebar-group">
              <a href="#digital-banking-tools" className="sidebar-link">
                {locale.sidebar.additional}
              </a>
            </div>
          </div>

          <div className="sidebar-help">
            <h3>{locale.sidebar.helpHeading}</h3>
            <p className="help-number">{locale.sidebar.helpNumber}</p>
            <div className="sidebar-subgroup">
              {locale.supportLinks.map((link) => (
                <a key={link} href="#footer-contact" className="sidebar-link help-link">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div className="main-content">
          <section className="hero-panel" id="about-us">
            <div className="hero-copy">
              <p className="eyebrow">{locale.hero.eyebrow}</p>
              <h1>{locale.hero.heading}</h1>
              <p className="hero-text">{locale.hero.text}</p>
              <div className="trust-ribbon">
                {locale.hero.trustRibbon.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="hero-actions">
                <a href="/register" className="btn btn-primary">
                  {locale.hero.createAccount}
                </a>
                <a href="/login" className="btn btn-secondary">
                  {locale.hero.signIn}
                </a>
              </div>
              <div className="value-grid">
                {locale.hero.valueCards.map((card) => (
                  <article key={card.title} className="value-card">
                    <strong>{card.title}</strong>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
              <div className="stat-grid">
                {locale.hero.stats.map((stat) => (
                  <article key={stat.label} className="stat-card">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <aside className="banking-panel">
                <div className="panel-top">
                  <p className="panel-kicker">{locale.bankingPanel.kicker}</p>
                  <h2>{locale.bankingPanel.heading}</h2>
                  <p className="panel-copy">{locale.bankingPanel.copy}</p>
                </div>

                <form className="banking-form">
                  <label>
                    <span>{locale.bankingPanel.userId}</span>
                    <input type="text" placeholder={locale.bankingPanel.userIdPlaceholder} />
                  </label>
                  <label>
                    <span>{locale.bankingPanel.password}</span>
                    <input type="password" placeholder={locale.bankingPanel.passwordPlaceholder} />
                  </label>
                  <div className="form-row">
                    <label className="checkbox-row">
                      <input type="checkbox" />
                      <span>{locale.bankingPanel.rememberMe}</span>
                    </label>
                    <a href="/login" className="mini-link">
                      {locale.bankingPanel.forgotPassword}
                    </a>
                  </div>
                  <button type="button" className="btn btn-primary banking-submit">
                    {locale.bankingPanel.login}
                  </button>
                </form>

                <div className="services-overview">
                  <h3>{locale.bankingPanel.servicesHeading}</h3>
                  <p>{locale.bankingPanel.servicesCopy}</p>
                  <ul>
                    {locale.digitalBankingLinks.map((link) => (
                      <li key={link}>{link}</li>
                    ))}
                  </ul>
                </div>

                <div className="panel-support">
                  <div>
                    <span className="support-label">{locale.bankingPanel.needHelp}</span>
                    <strong>{locale.bankingPanel.supportText}</strong>
                  </div>
                  <a href="/register" className="mini-link strong-link">
                    {locale.bankingPanel.applyOnline}
                  </a>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>

      <section className="feature-panel" id="digital-banking-tools">
        <div className="section-heading">
          <p className="eyebrow">Banking Tools</p>
          <h2>Quick destinations for rates, calculators, personal banking, business banking, and loans.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card" id="interest-rates">
            <span className="feature-dot" />
            <p>Interest rates and savings products designed for digital-first customers who want clear account options.</p>
          </article>
          <article className="feature-card" id="calculators">
            <span className="feature-dot" />
            <p>Calculators for transfers, payment planning, monthly budgeting, and savings projections.</p>
          </article>
          <article className="feature-card" id="personal-banking">
            <span className="feature-dot" />
            <p>Personal banking services including cards, alerts, money movement, and secure wallet access.</p>
          </article>
          <article className="feature-card" id="business-services">
            <span className="feature-dot" />
            <p>Business services for account servicing, payment intake, cash visibility, and banking support.</p>
          </article>
          <article className="feature-card" id="loan-services">
            <span className="feature-dot" />
            <p>Loan service pages for online applications, qualification guidance, and branch follow-up support.</p>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-intro">
            <a href="/" className="footer-brand">
              <img src="/flowpocket-logo.svg" alt="FlowPocket logo" className="footer-logo" />
              <span>FlowPocket</span>
            </a>
            <p className="footer-kicker">{locale.footer.kicker}</p>
            <h2>{locale.footer.heading}</h2>
            <a href="#" className="footer-social">
              {locale.footer.social}
            </a>
          </div>

          <div className="footer-contact-block" id="footer-contact">
            <p>{locale.footer.contactIntro1}</p>
            <p>{locale.footer.contactIntro2}</p>
            <p>
              <strong>{locale.footer.tollFree}</strong> 800-535-2169
            </p>
            <p id="story-city-branch">
              <strong>{locale.footer.storyCity}</strong> 515-733-4396
            </p>
            <p className="footer-branch-detail">{locale.footer.storyCityAddress}</p>
            <p className="footer-branch-detail">{locale.footer.storyCityHours}</p>
            <p id="garner-branch">
              <strong>{locale.footer.garner}</strong> 641-923-2801
            </p>
            <p className="footer-branch-detail">{locale.footer.garnerAddress}</p>
            <p className="footer-branch-detail">{locale.footer.garnerHours}</p>
            <p>
              <strong>{locale.footer.routing}</strong> 073920926
            </p>
            <p>{locale.footer.contactWire}</p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-link-column">
              {locale.footer.footerPrimaryLinks.map((link, index) => (
                <a key={link} href={footerPrimaryHrefs[index]} className="footer-link">
                  {link}
                </a>
              ))}
            </div>
            <div className="footer-link-column">
              {locale.footer.footerSecondaryLinks.map((link, index) => (
                <a key={link} href={footerSecondaryHrefs[index]} className="footer-link">
                  {link}
                </a>
              ))}
            </div>
            <div className="footer-link-column">
              <a href="#footer-contact" className="footer-link">
                {locale.footer.privacyPolicy}
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{locale.footer.copyright}</p>
          <p>{locale.footer.member}</p>
        </div>
      </footer>

      {isChatOpen && (
        <div className="chatbot-container chatbot-floating">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <h3>{locale.chatbot.title}</h3>
              <span className="chatbot-status">
                <span className="status-dot online"></span>
                Online
              </span>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="chatbot-close"
              aria-label={locale.chatbot.close}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-message chatbot-message-${msg.sender}`}>
                {msg.sender === 'bot' && <span className="message-avatar">🤖</span>}
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={locale.chatbot.placeholder}
              className="chatbot-input"
            />
            <button
              onClick={handleSendMessage}
              className="chatbot-send"
              aria-label={locale.chatbot.send}
            >
              {locale.chatbot.send}
            </button>
          </div>
        </div>
      )}

      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="chatbot-fab"
          aria-label={locale.utility.liveChat}
          title="Live Chat"
          id="live-chat"
        >
          💬
        </button>
      )}
    </main>
  );
}
