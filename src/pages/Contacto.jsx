import { useEffect, useState } from 'react';
import Ticker from '../components/Ticker';

const CHIPS = [
  '🎪 Quiero inscribirme',
  '🥁 Quiero una cotización',
  '🗓️ Quiero asistir a un evento',
  '👥 Quiero participar con mi comunidad',
  '🎭 Quiero información de talleres',
  '🎨 Colaboración artística',
  '❤️ Donaciones y apoyo',
];

const EXTRA_FIELDS = {
  '🎪 Quiero inscribirme': {
    emoji: '🎭',
    title: 'Ruta de inscripción carnavalera',
    description:
      'Completa tus datos para sumarte al ritmo, la energía y la comunidad de Chinchintirapie.',
    fields: [
      {
        id: 'disciplina',
        label: 'Disciplina que te llama',
        type: 'select',
        required: true,
        options: [
          'Selecciona una opción',
          'Percusión',
          'Danza',
          'Zancos',
          'Máscaras',
          'Batucada',
          'Otra',
        ],
      },
      {
        id: 'edad',
        label: 'Edad',
        type: 'number',
        placeholder: 'Ej: 22',
        required: true,
      },
      {
        id: 'experiencia',
        label: 'Tu experiencia en carnaval',
        type: 'select',
        required: true,
        options: [
          'Selecciona una opción',
          'Primera vez',
          'Nivel básico',
          'Ya he participado antes',
          'Tengo experiencia escénica',
        ],
      },
      {
        id: 'disponibilidad',
        label: 'Disponibilidad para talleres',
        type: 'text',
        placeholder: 'Ej: Sábados por la tarde',
        required: false,
      },
      {
        id: 'motivacion',
        label: '¿Qué te inspira del carnaval?',
        type: 'text',
        placeholder: 'Ej: La música, la danza y la comunidad',
        required: false,
      },
    ],
  },

  '🥁 Quiero una cotización': {
    emoji: '✨',
    title: 'Llevemos la fiesta a tu evento',
    description:
      'Cuéntanos cómo imaginas la experiencia para prepararte una propuesta artística.',
    fields: [
      {
        id: 'tipoEvento',
        label: 'Tipo de evento',
        type: 'select',
        required: true,
        options: [
          'Selecciona una opción',
          'Cumpleaños',
          'Festival',
          'Evento corporativo',
          'Colegio',
          'Matrimonio',
          'Otro',
        ],
      },
      {
        id: 'fechaEvento',
        label: 'Fecha del evento',
        type: 'date',
        required: true,
      },
      {
        id: 'comuna',
        label: 'Comuna o lugar del evento',
        type: 'text',
        placeholder: 'Ej: Santiago Centro',
        required: true,
      },
      {
        id: 'tipoShow',
        label: 'Tipo de show que imaginas',
        type: 'select',
        required: true,
        options: [
          'Selecciona una opción',
          'Pasacalle',
          'Comparsa',
          'Taller interactivo',
          'Intervención artística',
          'Show musical',
        ],
      },
      {
        id: 'asistentes',
        label: 'Cantidad aproximada de asistentes',
        type: 'number',
        placeholder: 'Ej: 120',
        required: false,
      },
      {
        id: 'presupuesto',
        label: 'Presupuesto estimado (opcional)',
        type: 'text',
        placeholder: 'Ej: $300.000 - $500.000',
        required: false,
      },
    ],
  },

  '🗓️ Quiero asistir a un evento': {
    emoji: '🎉',
    title: 'Súmate a una próxima celebración',
    description:
      'Déjanos tus datos y te compartiremos información sobre actividades, encuentros y jornadas abiertas.',
    fields: [
      {
        id: 'eventoInteres',
        label: 'Evento o actividad de interés',
        type: 'select',
        required: true,
        options: [
          'Selecciona una opción',
          'Pasacalle',
          'Taller abierto',
          'Encuentro comunitario',
          'Presentación en vivo',
          'Festival',
        ],
      },
      {
        id: 'cantidadPersonas',
        label: '¿Cuántas personas asistirían?',
        type: 'number',
        placeholder: 'Ej: 2',
        required: false,
      },
    ],
  },

  '👥 Quiero participar con mi comunidad': {
    emoji: '🤝',
    title: 'Carnaval comunitario',
    description:
      'Si representas una junta de vecinos, colectivo u organización, conversemos para crear algo en conjunto.',
    fields: [
      {
        id: 'organizacion',
        label: 'Nombre de la organización',
        type: 'text',
        placeholder: 'Ej: Junta de Vecinos Las Flores',
        required: true,
      },
      {
        id: 'tipoParticipacion',
        label: '¿Qué tipo de participación buscan?',
        type: 'select',
        required: true,
        options: [
          'Selecciona una opción',
          'Taller',
          'Presentación',
          'Pasacalle',
          'Actividad barrial',
          'Encuentro artístico',
        ],
      },
    ],
  },

  '🎭 Quiero información de talleres': {
    emoji: '🥁',
    title: 'Talleres con identidad carnavalera',
    description:
      'Cuéntanos qué disciplina te interesa y te orientaremos con fechas, niveles y modalidad.',
    fields: [
      {
        id: 'tallerInteres',
        label: 'Taller de interés',
        type: 'select',
        required: true,
        options: [
          'Selecciona una opción',
          'Percusión',
          'Danza',
          'Máscaras',
          'Zancos',
          'Expresión corporal',
        ],
      },
      {
        id: 'modalidad',
        label: 'Modalidad',
        type: 'select',
        required: false,
        options: ['Selecciona una opción', 'Infantil', 'Juvenil', 'Adultos', 'Todo público'],
      },
    ],
  },
};

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: '',
  disciplina: '',
  edad: '',
  experiencia: '',
  disponibilidad: '',
  motivacion: '',
  tipoEvento: '',
  fechaEvento: '',
  comuna: '',
  tipoShow: '',
  asistentes: '',
  presupuesto: '',
  eventoInteres: '',
  cantidadPersonas: '',
  organizacion: '',
  tipoParticipacion: '',
  tallerInteres: '',
  modalidad: '',
};

const slides = [
  {
    image: '/img/1.webp',
    title: 'Carnaval en movimiento',
    text: 'La calle, el ritmo y la comunidad se encuentran en cada presentación.',
  },
  {
    image: '/img/2.webp',
    title: 'Talleres con identidad',
    text: 'Aprender desde el cuerpo, la música y la fiesta colectiva.',
  },
  {
    image: '/img/3.webp',
    title: 'Fiesta para tu evento',
    text: 'Llevamos comparsas, talleres e intervenciones a distintos espacios.',
  },
];

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [selectedChip, setSelectedChip] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 960);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const extraConfig = EXTRA_FIELDS[selectedChip] || null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const validate = () => {
    const e = {};

    if (!form.nombre.trim()) e.nombre = 'Por favor, escribe tu nombre completo.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Ingresa un correo válido.';
    if (!form.asunto.trim()) e.asunto = 'Selecciona o escribe un asunto.';
    if (!form.mensaje.trim()) e.mensaje = 'Cuéntanos un poco más en tu mensaje.';

    if (extraConfig) {
      extraConfig.fields.forEach(({ id, required, label, options }) => {
        const value = form[id];
        const isEmpty =
          !String(value ?? '').trim() || (options && value === options[0]);

        if (required && isEmpty) {
          e[id] = `${label} es obligatorio.`;
        }
      });
    }

    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitted(true);
    console.log('Formulario enviado:', form);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleChip = (chip) => {
    setSelectedChip(chip);
    setForm((prev) => ({
      ...prev,
      asunto: chip,
    }));
    setErrors({});
  };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedChip('');
    setErrors({});
    setSubmitted(false);
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '.8rem 1rem',
    borderRadius: 12,
    border: `2px solid ${errors[field] ? 'var(--rojo)' : 'rgba(44,26,14,.15)'}`,
    fontFamily: 'Nunito, sans-serif',
    fontSize: '.95rem',
    background: '#fffaf4',
    color: 'var(--oscuro)',
    outline: 'none',
    transition: 'all .2s ease',
    marginTop: '.35rem',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    fontWeight: 800,
    fontSize: '.9rem',
    color: 'var(--oscuro)',
  };

  const errorStyle = {
    color: 'var(--rojo)',
    fontSize: '.78rem',
    marginTop: '.25rem',
    display: 'block',
  };

  const sectionTitle =
    selectedChip === '🎪 Quiero inscribirme'
      ? '🎭 Súmate a la comparsa'
      : selectedChip === '🥁 Quiero una cotización'
      ? '🥁 Llevemos el carnaval a tu evento'
      : selectedChip === '🗓️ Quiero asistir a un evento'
      ? '🎉 Vive una próxima celebración'
      : selectedChip === '👥 Quiero participar con mi comunidad'
      ? '🤝 Carnaval con el barrio'
      : selectedChip === '🎭 Quiero información de talleres'
      ? '🥁 Conoce nuestros talleres'
      : '🎭 Hablemos de carnaval';

  const messagePlaceholder =
    selectedChip === '🎪 Quiero inscribirme'
      ? 'Cuéntanos qué te mueve del carnaval y por qué quieres ser parte de Chinchintirapie...'
      : selectedChip === '🥁 Quiero una cotización'
      ? 'Describe tu evento, el ambiente que buscas y los detalles importantes para preparar la propuesta...'
      : selectedChip === '🗓️ Quiero asistir a un evento'
      ? 'Cuéntanos qué actividad te interesa o qué información te gustaría recibir...'
      : selectedChip === '👥 Quiero participar con mi comunidad'
      ? 'Descríbenos la idea, el territorio o la actividad comunitaria que imaginan...'
      : selectedChip === '🎭 Quiero información de talleres'
      ? 'Escríbenos qué te gustaría aprender y te orientamos...'
      : 'Escríbenos tu mensaje y te responderemos con alegría carnavalera...';

  const submitLabel =
    selectedChip === '🎪 Quiero inscribirme'
      ? '🎪 Enviar inscripción'
      : selectedChip === '🥁 Quiero una cotización'
      ? '🥁 Solicitar cotización'
      : selectedChip === '🗓️ Quiero asistir a un evento'
      ? '🎉 Solicitar información'
      : selectedChip === '👥 Quiero participar con mi comunidad'
      ? '🤝 Enviar propuesta comunitaria'
      : selectedChip === '🎭 Quiero información de talleres'
      ? '🥁 Consultar talleres'
      : '🎭 Enviar mensaje';

  const renderExtraField = ({ id, label, type, placeholder, options, required }) => (
    <div key={id} style={{ marginBottom: '1rem' }}>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: 'var(--rojo)' }}>*</span>}
      </label>

      {type === 'select' ? (
        <select value={form[id]} onChange={handleChange(id)} style={inputStyle(id)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={form[id]}
          onChange={handleChange(id)}
          placeholder={placeholder}
          style={inputStyle(id)}
        />
      )}

      {errors[id] && <span style={errorStyle}>{errors[id]}</span>}
    </div>
  );

  return (
    <>
      <Ticker text="🎭 Contáctanos · Súmate al carnaval · Ritmo, comunidad y fiesta · Chinchintirapie" />

      <div
        style={{
          background: 'linear-gradient(135deg, var(--morado-o), var(--purpura), var(--rojo))',
          padding: '4rem 2rem 3rem',
          textAlign: 'center',
          borderBottom: '4px solid var(--cian)',
        }}
      >
        <h1
          style={{
            fontFamily: 'Boogaloo, cursive',
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            color: '#fff',
            marginBottom: '.5rem',
            letterSpacing: '.02em',
          }}
        >
          Chinchintirapie
        </h1>

        <p
          style={{
            color: 'rgba(255,255,255,.86)',
            fontSize: '1.05rem',
            maxWidth: 700,
            margin: '0 auto',
          }}
        >
          Escuela carnavalera · Cada mensaje abre la puerta a una experiencia artística, comunitaria y festiva.
        </p>
      </div>

      <main style={{ background: 'var(--crema)', padding: '3rem 1.5rem 5rem' }}>
        <div
          style={{
            maxWidth: 1250,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.08fr',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              position: 'relative',
              minHeight: isMobile ? 380 : 820,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,.12)',
            }}
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,.58), rgba(0,0,0,.10), rgba(0,0,0,.20))',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.2rem',
              }}
            >
              <div
                style={{
                  alignSelf: 'flex-end',
                  display: 'flex',
                  gap: '.5rem',
                }}
              >
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Imagen anterior"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255,255,255,.18)',
                    color: '#fff',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() => setAutoPlay((prev) => !prev)}
                  aria-label={autoPlay ? 'Pausar carrusel' : 'Reanudar carrusel'}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255,255,255,.18)',
                    color: '#fff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {autoPlay ? '❚❚' : '▶'}
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Siguiente imagen"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255,255,255,.18)',
                    color: '#fff',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  ›
                </button>
              </div>

              <div
                style={{
                  color: '#fff',
                  background: 'rgba(0,0,0,.22)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,.15)',
                  borderRadius: 18,
                  padding: '1rem 1.1rem',
                  maxWidth: 470,
                }}
              >
                <p
                  style={{
                    fontSize: '.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.08em',
                    fontWeight: 800,
                    marginBottom: '.4rem',
                    color: '#ffd166',
                  }}
                >
                  Carnaval vivo
                </p>

                <h3
                  style={{
                    fontFamily: 'Boogaloo, cursive',
                    fontSize: isMobile ? '1.6rem' : '2rem',
                    marginBottom: '.45rem',
                    lineHeight: 1.05,
                  }}
                >
                  {slides[currentSlide].title}
                </h3>

                <p
                  style={{
                    fontSize: '.95rem',
                    lineHeight: 1.5,
                    color: 'rgba(255,255,255,.88)',
                    margin: 0,
                  }}
                >
                  {slides[currentSlide].text}
                </p>

                <div
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    gap: '.45rem',
                  }}
                >
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Ir a la imagen ${index + 1}`}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        background:
                          currentSlide === index ? '#ffd166' : 'rgba(255,255,255,.45)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                background: '#fff4ea',
                border: '1px solid rgba(192,57,43,.2)',
                borderRadius: 16,
                padding: '1rem 1.2rem',
                marginBottom: '1.5rem',
                fontSize: '.92rem',
              }}
            >
              📧 Correo:{' '}
              <a
                href="mailto:chinchintirapie@gmail.com"
                style={{ color: 'var(--rojo)', fontWeight: 800 }}
              >
                chinchintirapie@gmail.com
              </a>
            </div>

            {submitted ? (
              <div
                style={{
                  background: '#fff',
                  borderRadius: 22,
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  boxShadow: '0 8px 30px rgba(0,0,0,.08)',
                }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                <h2
                  style={{
                    fontFamily: 'Boogaloo, cursive',
                    fontSize: '2rem',
                    color: 'var(--oscuro)',
                    marginBottom: '.6rem',
                  }}
                >
                  ¡Tu mensaje ya está bailando con nosotros!
                </h2>

                <p style={{ color: '#6f6259' }}>
                  Gracias por escribir a Chinchintirapie. Te responderemos pronto.
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    marginTop: '1.5rem',
                    padding: '.8rem 1.4rem',
                    background: 'var(--rojo)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid rgba(63,45,34,.1)',
                  borderRadius: 22,
                  padding: '2rem',
                  boxShadow: '0 8px 24px rgba(63,45,34,.07)',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'Boogaloo, cursive',
                    fontSize: '1.7rem',
                    marginBottom: '.35rem',
                    color: 'var(--oscuro)',
                  }}
                >
                  {sectionTitle}
                </h2>

                <p style={{ fontSize: '.92rem', color: '#6f6259', marginBottom: '1.2rem' }}>
                  Selecciona el ritmo de tu mensaje y completa el formulario.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '.5rem',
                    marginBottom: '1.4rem',
                  }}
                >
                  {CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChip(chip)}
                      style={{
                        fontSize: '.82rem',
                        fontWeight: 800,
                        padding: '.45rem .85rem',
                        borderRadius: 999,
                        border: `1px solid ${
                          selectedChip === chip
                            ? 'rgba(192,57,43,.45)'
                            : 'rgba(63,45,34,.15)'
                        }`,
                        background:
                          selectedChip === chip
                            ? 'linear-gradient(135deg, rgba(192,57,43,.14), rgba(255,193,7,.16))'
                            : '#fffaf5',
                        color: selectedChip === chip ? 'var(--rojo)' : '#6f6259',
                        cursor: 'pointer',
                        transition: 'all 140ms',
                        fontFamily: 'Nunito, sans-serif',
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {extraConfig && (
                  <div
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,245,230,1), rgba(255,237,214,1))',
                      border: '1px solid rgba(192,57,43,.18)',
                      borderRadius: 16,
                      padding: '1rem 1rem',
                      marginBottom: '1.2rem',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '.8rem',
                        fontWeight: 900,
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                        color: 'var(--rojo)',
                        marginBottom: '.35rem',
                      }}
                    >
                      {extraConfig.emoji} {extraConfig.title}
                    </p>
                    <p style={{ fontSize: '.92rem', color: '#6f6259' }}>
                      {extraConfig.description}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div>
                      <label style={labelStyle}>
                        ¿Cómo te llamas? <span style={{ color: 'var(--rojo)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={form.nombre}
                        onChange={handleChange('nombre')}
                        placeholder="Tu nombre completo"
                        style={inputStyle('nombre')}
                      />
                      {errors.nombre && <span style={errorStyle}>{errors.nombre}</span>}
                    </div>

                    <div>
                      <label style={labelStyle}>
                        ¿Dónde te respondemos? <span style={{ color: 'var(--rojo)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        placeholder="tu@email.com"
                        style={inputStyle('email')}
                      />
                      {errors.email && <span style={errorStyle}>{errors.email}</span>}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Teléfono de contacto (opcional)</label>
                    <input
                      type="tel"
                      value={form.telefono}
                      onChange={handleChange('telefono')}
                      placeholder="+56 9 1234 5678"
                      style={inputStyle('telefono')}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>
                      Asunto <span style={{ color: 'var(--rojo)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.asunto}
                      onChange={handleChange('asunto')}
                      placeholder="Selecciona un chip o escribe tu asunto"
                      style={{
                        ...inputStyle('asunto'),
                        background: selectedChip ? '#f7efe6' : '#fffaf4',
                      }}
                    />
                    {errors.asunto && <span style={errorStyle}>{errors.asunto}</span>}
                  </div>

                  {extraConfig && (
                    <div
                      style={{
                        background: '#fffaf4',
                        border: '1px dashed rgba(63,45,34,.18)',
                        borderRadius: 16,
                        padding: '1rem',
                        marginBottom: '1.2rem',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '.82rem',
                          fontWeight: 900,
                          color: '#6f6259',
                          marginBottom: '.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '.05em',
                        }}
                      >
                        Detalles de tu camino carnavalero
                      </p>

                      {extraConfig.fields.map(renderExtraField)}
                    </div>
                  )}

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>
                      Tu mensaje <span style={{ color: 'var(--rojo)' }}>*</span>
                    </label>
                    <textarea
                      value={form.mensaje}
                      onChange={handleChange('mensaje')}
                      rows={5}
                      placeholder={messagePlaceholder}
                      style={{ ...inputStyle('mensaje'), resize: 'vertical' }}
                    />
                    {errors.mensaje && <span style={errorStyle}>{errors.mensaje}</span>}
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '.95rem',
                      background: 'linear-gradient(135deg, var(--rojo), #d35400)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 14,
                      fontFamily: 'Nunito, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      letterSpacing: '.03em',
                      boxShadow: '0 8px 18px rgba(192,57,43,.22)',
                    }}
                  >
                    {submitLabel}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}