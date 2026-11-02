// Documented projects supplied by Alex.
window.PORTFOLIO_PROJECTS = [
  [
    "SGP Proprint",
    "Flask · Angular 21 · SQLite",
    "systems",
    "Proprint",
    "Sistema de gestión de producción para ProPrint, en Cuenca. Integra inventario, pedidos y producción sobre una API Flask y una interfaz Angular. En uso diario, con soporte y mantenimiento continuo a mi cargo.",
    {
      "url": "https://alekspaucar.github.io/trabajoSGP/",
      "caption": "Producción / Captura real de SGP Proprint",
      "role": "Ingeniería de sistemas · desarrollo y soporte técnico",
      "status": "En producción · mantenimiento activo",
      "story": "Participé en el desarrollo de la aplicación y continúo dando mantenimiento al sistema y al servidor Ubuntu de la planta. Mi trabajo incluye soporte técnico, actualizaciones y resolución de incidencias, desde el frontend Angular hasta la API Flask y el servicio desplegado.",
      "note": "Capturas del sistema y documentación publicadas en el cronograma de desarrollo de SGP Proprint. El enlace muestra el proyecto entregado; no es una demostración con acceso al sistema de la imprenta.",
      "notes": [
        [
          "Arquitectura",
          "Angular 21 y TypeScript · API REST Flask · SQLAlchemy y SQLite. Ocho módulos conectados para la operación de la imprenta."
        ],
        [
          "Infraestructura",
          "Servidor Ubuntu en planta, Gunicorn y servicio systemd. Aplicación disponible a través de la red interna de la empresa."
        ],
        [
          "Mantenimiento continuo",
          "Sigo a cargo del soporte técnico y mantenimiento del sistema y del servidor: actualizaciones, diagnóstico y resolución de incidencias."
        ]
      ],
      "technical": [
        [
          "Arquitectura de aplicación",
          [
            "Frontend Angular 21, TypeScript y Tailwind CSS.",
            "API REST en Python con Flask y SQLAlchemy.",
            "SQLite, sesiones Flask-Login y permisos por rol."
          ]
        ],
        [
          "Despliegue e infraestructura",
          [
            "Ubuntu Server en la planta de ProPrint.",
            "Gunicorn administrado como servicio systemd.",
            "Frontend y API servidos por Flask en la red interna."
          ]
        ],
        [
          "Integraciones y procesos",
          [
            "Scanner USB para entradas y salidas de materiales.",
            "Lectura de documentos con Tesseract OCR y pdfplumber.",
            "Kanban y monitor TV con sondeo periódico; reportes PDF y Excel."
          ]
        ],
        [
          "Mi responsabilidad actual",
          [
            "Mantenimiento de la aplicación y del servidor.",
            "Soporte técnico, diagnóstico y resolución de incidencias.",
            "Actualizaciones del sistema y seguimiento de su funcionamiento."
          ]
        ]
      ],
      "screenshots": [
        {
          "label": "Producción",
          "src": "assets/sgp/produccion.png",
          "alt": "SGP Proprint: tablero Kanban con pedidos en cola, procesando y terminados",
          "caption": "Tablero Kanban · estado por pedido, semáforo de entrega y cuenta regresiva."
        },
        {
          "label": "Inventario",
          "src": "assets/sgp/inventario.png",
          "alt": "SGP Proprint: inventario de materiales y estados de stock",
          "caption": "Inventario de bodega · categorías, estados de stock y alertas."
        },
        {
          "label": "Pedidos",
          "src": "assets/sgp/pedidos.png",
          "alt": "SGP Proprint: formulario de nuevo pedido con importación de documentos",
          "caption": "Pedidos · carga de documentos PDF e imágenes con lectura OCR y revisión manual."
        },
        {
          "label": "Monitor TV",
          "src": "assets/sgp/monitor-tv.png",
          "alt": "SGP Proprint: monitor de pedidos de la planta",
          "caption": "Monitor TV · conteos por estado y seguimiento de pedidos en planta."
        },
        {
          "label": "Scanner",
          "src": "assets/sgp/operaciones.png",
          "alt": "SGP Proprint: registro de entradas y salidas con scanner",
          "caption": "Operaciones · escaneo de códigos de barras e historial de movimientos."
        },
        {
          "label": "Reportes",
          "src": "assets/sgp/reportes.png",
          "alt": "SGP Proprint: reportes de stock y pedidos",
          "caption": "Reportes · filtros por período y exportación a Excel y PDF."
        },
        {
          "label": "Cronograma",
          "src": "assets/sgp/cronograma.jpg",
          "alt": "Captura del cronograma completo de desarrollo de SGP Proprint",
          "caption": "Cronograma de entrega · seis fases y veinticinco semanas documentadas."
        }
      ]
    }
  ],
  [
    "Horizonte Sostenible",
    "Django · DRF · Angular · PostgreSQL",
    "systems",
    "Horizonte",
    "ERP agrícola y e-commerce. Mi participación se centra en Productividad de Granja, Kardex FIFO y Nómina, conectando cultivo, inventario y gestión del personal.",
    {
      "caption": "Productividad de Granja / Captura del entorno local",
      "role": "Mis módulos · Granja, Kardex y Nómina",
      "status": "Proyecto colaborativo · entorno de demostración",
      "story": "Desarrollo de módulos para el seguimiento de cultivos, la trazabilidad de inventario y la gestión de nómina, dentro del proyecto colaborativo Horizonte Sostenible. Interfaz Angular y servicios Django REST Framework sobre PostgreSQL.",
      "note": "Capturas reales tomadas del sistema local. El catálogo y Kardex contienen datos de demostración; esta instalación todavía no tiene lotes de cultivo ni roles de pago registrados. Los valores mostrados no representan resultados de negocio.",
      "notes": [
        [
          "Productividad de Granja",
          "Ciclo de siembra a cosecha, proyección en unidades y kilos y registro de parámetros de agua."
        ],
        [
          "Kardex FIFO",
          "Movimientos por bodega, filtros de artículos y trazabilidad de lotes con cantidades y costos."
        ],
        [
          "Nómina",
          "Roles de pago, liquidaciones, provisiones y gestión de jornaleros dentro del ERP."
        ]
      ],
      "technical": [
        [
          "Mi participación",
          [
            "Productividad de Granja y control de cultivos.",
            "Kardex de inventario y trazabilidad FIFO.",
            "Módulo de Nómina y gestión de pagos al personal."
          ]
        ],
        [
          "Arquitectura del proyecto",
          [
            "Interfaz Angular 21 con TypeScript y Tailwind CSS.",
            "API en Python con Django y Django REST Framework.",
            "Persistencia PostgreSQL y permisos por área."
          ]
        ],
        [
          "Integración operativa",
          [
            "Seguimiento del ciclo de cultivo hasta la cosecha.",
            "Registro de inventario por bodega y consulta de lotes FIFO.",
            "Conexión de la gestión agrícola con el resto del ERP."
          ]
        ],
        [
          "Sobre las capturas",
          [
            "Vistas del entorno local de desarrollo.",
            "Productos y movimientos de inventario de demostración.",
            "Formularios consultados sin crear o modificar registros."
          ]
        ]
      ],
      "screenshots": [
        {
          "label": "Granja",
          "src": "assets/horizonte/granja.jpg",
          "width": 1274,
          "height": 717,
          "alt": "Horizonte Sostenible: dashboard de productividad de Granja",
          "caption": "Productividad de Granja · cosechas, mermas y proyección. Instalación local sin lotes registrados."
        },
        {
          "label": "Kardex",
          "src": "assets/horizonte/kardex.jpg",
          "alt": "Horizonte Sostenible: Kardex de Bodega Norte con movimientos de demostración",
          "caption": "Kardex por bodega · movimientos, artículos, fechas, cantidades y costos de demostración."
        },
        {
          "label": "Lotes FIFO",
          "src": "assets/horizonte/fifo.jpg",
          "alt": "Horizonte Sostenible: trazabilidad de lotes FIFO de inventario",
          "caption": "Trazabilidad FIFO · consulta del lote físico asociado a un movimiento de inventario de demostración."
        },
        {
          "label": "Lotes de cultivo",
          "src": "assets/horizonte/lotes.jpg",
          "alt": "Horizonte Sostenible: formulario de un nuevo lote de cultivo",
          "caption": "Lotes de cultivo · siembra, variedad, proyección y destino de la cosecha. Formulario consultado sin guardar."
        },
        {
          "label": "Tanques",
          "src": "assets/horizonte/tanques.jpg",
          "alt": "Horizonte Sostenible: control de parámetros de agua de tanques",
          "caption": "Tanques y parámetros · registro de pH, conductividad y temperaturas del agua y del ambiente."
        },
        {
          "label": "Nómina",
          "src": "assets/horizonte/nomina-general.jpg",
          "width": 1242,
          "height": 530,
          "alt": "Horizonte Sostenible: vista general del módulo de Nómina",
          "caption": "Nómina · roles de pago, liquidaciones, décimos y jornaleros. Entorno local sin pagos registrados."
        },
        {
          "label": "Datos salariales",
          "src": "assets/horizonte/nomina-datos.jpg",
          "width": 482,
          "height": 624,
          "alt": "Formulario de nómina: empleado, período, sueldo, deducciones y provisiones completos",
          "caption": "Datos salariales · encuadre de los campos completos, desde el empleado hasta la forma de pago. Consulta sin guardar."
        },
        {
          "label": "Horas extras e IESS",
          "src": "assets/horizonte/nomina-calculos.jpg",
          "width": 482,
          "height": 573,
          "alt": "Formulario de nómina: secciones completas de horas extras y obligaciones con el IESS",
          "caption": "Cálculos de nómina · horas ordinarias, días extraordinarios y desglose de aportes al IESS. Valores de demostración."
        },
        {
          "label": "Catálogo",
          "src": "assets/horizonte/catalogo.jpg",
          "alt": "Horizonte Sostenible: catálogo de e-commerce con productos de demostración",
          "caption": "Catálogo del proyecto colaborativo · productos de demostración, categorías, stock y precios."
        }
      ]
    }
  ],
  [
    "Entre líneas",
    "Angular · TypeScript · Lectura bilingüe",
    "web",
    "Entre líneas",
    "Un lector bilingüe que hice para aprender construyendo. Historias cortas, español e inglés por frase y palabras que muestran su traducción al tocarlas. Lo mantuve sencillo para ir entendiendo cada parte.",
    {
      "actionLabel": "Explorar el lector",
      "caption": "Entre líneas / Capturas reales del proyecto",
      "role": "Proyecto personal de aprendizaje",
      "status": "Prototipo educativo · aprender haciendo",
      "story": "Quería practicar inglés y, al mismo tiempo, aprender a construir una aplicación. Empecé por lo esencial: elegir una historia, leerla en dos idiomas y consultar palabras sin salir del texto. Después fui añadiendo anotaciones, preferencias y navegación.",
      "note": "Capturas reales de la aplicación local compartida por Alex. Es un proyecto personal de aprendizaje; las historias están incluidas en la aplicación. El audio usa las voces disponibles en el navegador, no un servicio de IA propio.",
      "notes": [
        [
          "La idea",
          "Aprender inglés con historias breves y un lector que no interrumpa la lectura."
        ],
        [
          "Lo que construí",
          "Biblioteca por niveles, frases bilingües, traducciones y anotaciones."
        ],
        [
          "Lo que aprendí",
          "Componentes, rutas, estado y preferencias, avanzando paso a paso."
        ]
      ],
      "technical": [
        [
          "Base de la aplicación",
          [
            "Angular 22 y TypeScript 6.",
            "Componentes de lectura y navegación entre biblioteca e historias.",
            "Estado y preferencias con Signals."
          ]
        ],
        [
          "Experiencia de lectura",
          [
            "Siete historias cortas entre los niveles A1 y B2.",
            "Texto español-inglés por frase y glosas al tocar palabras.",
            "Anotaciones y opciones para mostrar, velar u ocultar el español."
          ]
        ],
        [
          "Audio y preferencias",
          [
            "Síntesis de voz del navegador por frase o historia.",
            "Velocidad y voz según disponibilidad del dispositivo.",
            "Preferencias y anotaciones conservadas localmente."
          ]
        ],
        [
          "Propósito y alcance",
          [
            "Proyecto personal para aprender desarrollando.",
            "Interfaz de lectura sencilla y adaptable al celular.",
            "Capturas del proyecto local; no se enlaza localhost como una demo pública."
          ]
        ]
      ],
      "screenshots": [
        {
          "label": "Biblioteca",
          "src": "assets/entre-lineas/biblioteca.jpg",
          "width": 1280,
          "height": 505,
          "alt": "Entre líneas: biblioteca con historias breves clasificadas por nivel",
          "caption": "Biblioteca · selección de historias por nivel y tiempo aproximado de lectura."
        },
        {
          "label": "Lector",
          "src": "assets/entre-lineas/lector.jpg",
          "width": 1280,
          "height": 720,
          "alt": "Entre líneas: lector bilingüe con herramientas y preferencias",
          "caption": "Lector · historia bilingüe, anotaciones y controles de lectura."
        },
        {
          "label": "Traducciones",
          "src": "assets/entre-lineas/glosa.jpg",
          "width": 1280,
          "height": 720,
          "alt": "Entre líneas: la palabra quiet muestra tranquilo entre líneas y se guarda en anotaciones",
          "caption": "Traducción contextual · tocar «quiet» muestra «tranquilo» y añade la palabra a las anotaciones."
        },
        {
          "label": "Vista móvil",
          "src": "assets/entre-lineas/movil.jpg",
          "width": 390,
          "height": 844,
          "alt": "Entre líneas: lectura bilingüe y controles adaptados a una pantalla móvil",
          "caption": "Vista móvil · captura del lector en una ventana de 390 píxeles de ancho."
        },
        {
          "label": "Todas las historias",
          "src": "assets/entre-lineas/biblioteca-completa.jpg",
          "width": 1280,
          "height": 1567,
          "alt": "Entre líneas: biblioteca completa con siete historias de niveles A1 a B2",
          "caption": "Biblioteca completa · las siete historias incluidas en el prototipo."
        }
      ]
    }
  ],
  [
    "Aleksound",
    "Flutter · Dart · Swift · iOS",
    "web",
    "Aleksound",
    "Tu música, a tu manera. Una app personal para iPhone con biblioteca, reproducción y descargas para escuchar sin conexión. Diseñada en claro y oscuro, con controles desde la pantalla bloqueada.",
    {
      "url": "https://github.com/alekspaucar/aleksound",
      "sourceLabel": "Ver código en GitHub",
      "actionLabel": "Explorar la app",
      "presentation": "phones",
      "caption": "Aleksound / Capturas reales en iPhone",
      "role": "Proyecto personal · desarrollo móvil e integración iOS",
      "status": "App en desarrollo · instalada en iPhone",
      "story": "Construí la experiencia de biblioteca, búsqueda y reproducción con Flutter, e integré descargas y controles del sistema con código Swift. La música descargada se conserva en el dispositivo, junto con el historial, los favoritos y la biblioteca.",
      "note": "Capturas reales proporcionadas por Alex desde su iPhone. El proyecto cuenta con código público; no se presenta como una aplicación publicada en App Store. La reproducción de archivos descargados es distinta de guardar sus metadatos en la biblioteca.",
      "notes": [
        [
          "Experiencia móvil",
          "Biblioteca, búsqueda, álbumes, favoritos y cola. Temas claro, oscuro y según el dispositivo."
        ],
        [
          "Escucha sin conexión",
          "Descargas con progreso, cancelación y reintento. Reproducción de archivos locales y persistencia de la biblioteca."
        ],
        [
          "Integración con iPhone",
          "Audio en segundo plano y controles de reproducción, carátula y progreso desde las superficies de iOS."
        ]
      ],
      "technical": [
        [
          "Aplicación y estado",
          [
            "Flutter y Dart para interfaz, navegación y estado.",
            "Biblioteca, historial, favoritos y metadatos persistentes.",
            "Selección de tema claro, oscuro o del dispositivo."
          ]
        ],
        [
          "Motor de reproducción",
          [
            "just_audio para reproducción y gestión de audio.",
            "Cola de canciones y prioridad de archivos descargados.",
            "Continuidad de la escucha en segundo plano."
          ]
        ],
        [
          "Puente nativo en Swift",
          [
            "URLSession para transferencias y descargas.",
            "AVFoundation para preparar archivos AAC/M4A.",
            "MediaPlayer para información y comandos del sistema."
          ]
        ],
        [
          "Evidencia del proyecto",
          [
            "Capturas de la app ejecutándose en el iPhone de Alex.",
            "Código y documentación disponibles en GitHub.",
            "Proyecto en desarrollo; sin publicación en App Store."
          ]
        ]
      ],
      "screenshots": [
        {
          "label": "Inicio oscuro",
          "src": "assets/aleksound/inicio-oscuro.png",
          "device": "phone",
          "width": 1179,
          "height": 2556,
          "alt": "Aleksound en iPhone: inicio oscuro con biblioteca y minirreproductor",
          "caption": "Inicio en modo oscuro · escuchadas recientemente, categorías y minirreproductor."
        },
        {
          "label": "Reproductor",
          "src": "assets/aleksound/reproductor.png",
          "device": "phone",
          "width": 1179,
          "height": 2556,
          "alt": "Aleksound: reproductor con controles y canción descargada sin conexión",
          "caption": "Reproductor · carátula, progreso, favoritos y estado «Descargada · Sin internet»."
        },
        {
          "label": "Inicio claro",
          "src": "assets/aleksound/inicio-claro.png",
          "device": "phone",
          "width": 1179,
          "height": 2556,
          "alt": "Aleksound en iPhone: inicio con tema claro",
          "caption": "La misma biblioteca en modo claro · navegación, filtros y reproducción persistente."
        },
        {
          "label": "Apariencia",
          "src": "assets/aleksound/apariencia.png",
          "device": "phone",
          "width": 1179,
          "height": 2556,
          "alt": "Aleksound: selector de apariencia según el dispositivo, claro y oscuro",
          "caption": "Apariencia · cambio entre tema del dispositivo, claro y oscuro."
        },
        {
          "label": "Pantalla bloqueada",
          "src": "assets/aleksound/pantalla-bloqueada.png",
          "device": "phone",
          "width": 1179,
          "height": 2556,
          "alt": "iOS: controles de Aleksound desde la pantalla bloqueada del iPhone",
          "caption": "Integración iOS · título, artista, progreso y controles desde la pantalla bloqueada."
        },
        {
          "label": "Controles iOS",
          "src": "assets/aleksound/control-center.png",
          "device": "phone",
          "width": 1179,
          "height": 2556,
          "alt": "iOS: controles multimedia expandidos con Aleksound en reproducción",
          "caption": "Controles del sistema · reproducción y volumen en la interfaz multimedia de iOS."
        },
        {
          "label": "Carátula en iOS",
          "src": "assets/aleksound/caratula-ios.png",
          "device": "phone",
          "width": 1179,
          "height": 2556,
          "alt": "iOS: carátula expandida y controles de Aleksound",
          "caption": "Pantalla bloqueada · carátula expandida y controles multimedia de la sesión de audio."
        }
      ]
    }
  ],
  [
    "Bot VIP Telegram",
    "Python · Telegram Bot API · Railway",
    "labs",
    "Bot VIP",
    "Bot de Telegram para gestionar membresías temporales de un grupo. Recibe comprobantes, los envía al administrador y concede acceso por 30 días después de la aprobación manual. Lo desplegué en Railway.",
    {
      "url": "https://github.com/alekspaucar/botTelegram",
      "sourceLabel": "Ver código en GitHub",
      "actionLabel": "Explorar el bot",
      "presentation": "telegram",
      "caption": "Telegram / Captura con datos bancarios censurados",
      "role": "Proyecto personal · automatización con Python",
      "status": "Membresías temporales · despliegue en Railway",
      "story": "Automaticé el flujo de ingreso a un grupo: el usuario envía la foto de su comprobante y el administrador la revisa. Tras aprobar, el bot genera una invitación y registra el vencimiento. Una tarea programada revisa cuándo termina cada membresía.",
      "note": "Captura compartida por Alex y editada únicamente para censurar datos personales y bancarios. La aprobación del pago es manual: el bot no consulta ni valida una transferencia con el banco. Railway fue el entorno de despliegue; la disponibilidad actual del servicio no se ha verificado.",
      "notes": [
        [
          "Recepción y revisión",
          "El comprobante se recibe por chat privado y se reenvía al administrador."
        ],
        [
          "Acceso temporal",
          "Aprobación manual, invitación de un uso y membresía de 30 días."
        ],
        [
          "Automatización",
          "Revisión programada de vencimientos y persistencia sencilla en JSON."
        ]
      ],
      "technical": [
        [
          "Implementación",
          [
            "Python y python-telegram-bot 22.5 con job-queue.",
            "Comandos /start y /aprobar, y recepción de fotografías.",
            "Consultas a Telegram mediante polling."
          ]
        ],
        [
          "Control de membresías",
          [
            "El comando de aprobación se limita al administrador.",
            "Invitación con límite de un miembro tras la revisión manual.",
            "Fecha de vencimiento a 30 días por usuario."
          ]
        ],
        [
          "Tareas y persistencia",
          [
            "Revisión de vencimientos cada 60 segundos.",
            "Retirada del acceso al vencer y actualización de los registros.",
            "Identificador y fecha guardados en un archivo JSON."
          ]
        ],
        [
          "Despliegue",
          [
            "Railway como entorno de despliegue del proyecto.",
            "Token del bot leído desde una variable de entorno.",
            "Sin atribuir verificación bancaria automática ni disponibilidad actual."
          ]
        ]
      ],
      "screenshots": [
        {
          "label": "Conversación",
          "src": "assets/telegram/conversacion-censurada.png",
          "width": 1136,
          "height": 1384,
          "alt": "Bot de Telegram recibiendo un comprobante con nombres, cuentas y referencias cubiertos con barras negras",
          "caption": "Conversación del bot · comprobantes con datos personales y bancarios censurados."
        }
      ]
    }
  ]
];
