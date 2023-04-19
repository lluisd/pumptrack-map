import { useEffect } from "react"

import 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

export default function CookieConsent() {
  useEffect(() => {

    if (!document.getElementById('cc--main')) {
      window.CookieConsentApi = window.initCookieConsent()
      const container =  document.getElementById('cc--main')
      //
      window.CookieConsentApi.run({
        gui_options: {
          consent_modal: {
            layout: 'bar',
          },
        },
        current_lang: 'es',
        autoclear_cookies: true, // default: false
        page_scripts: true, // default: false
        test: 'ciao',
        // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
        // delay: 0,                               // default: 0
        // auto_language: null                     // default: null; could also be 'browser' or 'document'
        // autorun: true,                          // default: true
        // force_consent: false,                   // default: false
        // hide_from_bots: false,                  // default: false
        // remove_cookie_tables: false             // default: false
        // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
        // cookie_expiration: 182,                 // default: 182 (days)
        // cookie_necessary_only_expiration: 182   // default: disabled
        // cookie_domain: location.hostname,       // default: current domain
        // cookie_path: '/',                       // default: root
        // cookie_same_site: 'Lax',                // default: 'Lax'
        // use_rfc_cookie: false,                  // default: false
        // revision: 0,                            // default: 0

        onFirstAction: function (user_preferences, cookie) {
          // callback triggered only once
        },

        onAccept: function (cookie) {
          // ...
        },

        onChange: function (cookie, changed_preferences) {
          // ...
        },

        languages: {
          es: {
            consent_modal: {
              title: '¡Usamos cookies!',
              description:
                'Hola, este sitio web utiliza cookies esenciales para garantizar su correcto funcionamiento y cookies de seguimiento para comprender cómo interactúas con él. Este último se fijará sólo después del consentimiento. <button type="button" data-cc="c-settings" class="cc-link">Dejame elegir</button>',
              primary_btn: {
                text: 'Aceptar todas',
                role: 'accept_all', // 'accept_selected' or 'accept_all'
              },
              secondary_btn: {
                text: 'Denegar',
                role: 'accept_necessary', // 'settings' or 'accept_necessary'
              },
            },
            settings_modal: {
              title: 'Configuración de cookies',
              save_settings_btn: 'Guardar ajustes',
              accept_all_btn: 'Aceptar todas',
              reject_all_btn: 'Denegar',
              close_btn_label: 'Cerrar',
              cookie_table_headers: [
                { col1: 'Nombre' },
                { col2: 'Dominio' },
                { col3: 'Vencimiento' },
                { col4: 'Descripcion' },
              ],
              blocks: [
                {
                  title: 'Uso de cookies 📢',
                  description:
                    'Utilizo cookies para garantizar las funcionalidades básicas del sitio web y mejorar su experiencia en línea. Puede elegir para cada categoría optar por participar o no participar cuando lo desee. Para obtener más detalles relacionados con las cookies y otros datos confidenciales, lea el <a href="#" class="cc-link">privacy policy</a>.',
                },
                {
                  title: 'Cookies estrictamente necesarias',
                  description:
                    'Estas cookies son esenciales para el correcto funcionamiento de mi sitio web. Sin estas cookies, el sitio web no funcionaría correctamente.',
                  toggle: {
                    value: 'necessary',
                    enabled: true,
                    readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
                  },
                },
                {
                  title: 'Cookies de rendimiento y análisis',
                  description:
                    'Estas cookies permiten que el sitio web recuerde las elecciones que ha realizado en el pasado.',
                  toggle: {
                    value: 'analytics', // your cookie category
                    enabled: false,
                    readonly: false,
                  },
                  cookie_table: [
                    {
                      col1: '^_ga', // match all cookies starting with "_ga"
                      col2: 'google.com',
                      col3: '2 years',
                      col4: 'Used by Google Analytics to collect data on the number of times a user has visited the website as well as dates for the first and most recent visit.',
                      is_regex: true,
                    }
                  ],
                },
                {
                  title: 'Cookies publicitarias y de orientación',
                  description:
                    'Estas cookies recopilan información sobre cómo usa el sitio web, qué páginas visitó y en qué enlaces hizo clic. Todos los datos son anónimos y no se pueden usar para identificarlo.',
                  toggle: {
                    value: 'targeting',
                    enabled: false,
                    readonly: false,
                  },
                },
                {
                  title: 'Más información',
                  description:
                    'Para cualquier consulta en relación con nuestra política de cookies y sus elecciones, por favor <a class="cc-link" href="#yourcontactpage">contacta con nosotros</a>.',
                },
              ],
            },
          },
        },
      });
    }

  }, [])

  return null
}
