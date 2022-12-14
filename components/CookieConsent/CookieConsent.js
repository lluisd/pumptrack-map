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
          en: {
            consent_modal: {
              title: '??Usamos cookies!',
              description:
                'Hola, este sitio web utiliza cookies esenciales para garantizar su correcto funcionamiento y cookies de seguimiento para comprender c??mo interact??as con ??l. Este ??ltimo se fijar?? s??lo despu??s del consentimiento. <button type="button" data-cc="c-settings" class="cc-link">Dejame elegir</button>',
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
              title: 'Configuraci??n de cookies',
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
                  title: 'Uso de cookies ????',
                  description:
                    'Utilizo cookies para garantizar las funcionalidades b??sicas del sitio web y mejorar su experiencia en l??nea. Puede elegir para cada categor??a optar por participar o no participar cuando lo desee. Para obtener m??s detalles relacionados con las cookies y otros datos confidenciales, lea el <a href="#" class="cc-link">privacy policy</a>.',
                },
                {
                  title: 'Cookies estrictamente necesarias',
                  description:
                    'Estas cookies son esenciales para el correcto funcionamiento de mi sitio web. Sin estas cookies, el sitio web no funcionar??a correctamente.',
                  toggle: {
                    value: 'necessary',
                    enabled: true,
                    readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
                  },
                },
                {
                  title: 'Cookies de rendimiento y an??lisis',
                  description:
                    'Estas cookies permiten que el sitio web recuerde las elecciones que ha realizado en el pasado.',
                  toggle: {
                    value: 'analytics', // your cookie category
                    enabled: false,
                    readonly: false,
                  },
                  cookie_table: [
                    // list of all expected cookies
                    {
                      col1: '^_ga', // match all cookies starting with "_ga"
                      col2: 'google.com',
                      col3: '2 years',
                      col4: 'description ...',
                      is_regex: true,
                    },
                    {
                      col1: '_gid',
                      col2: 'google.com',
                      col3: '1 day',
                      col4: 'description ...',
                    },
                  ],
                },
                {
                  title: 'Cookies publicitarias y de orientaci??n',
                  description:
                    'Estas cookies recopilan informaci??n sobre c??mo usa el sitio web, qu?? p??ginas visit?? y en qu?? enlaces hizo clic. Todos los datos son an??nimos y no se pueden usar para identificarlo.',
                  toggle: {
                    value: 'targeting',
                    enabled: false,
                    readonly: false,
                  },
                },
                {
                  title: 'M??s informaci??n',
                  description:
                    'Para cualquier consulta en relaci??n con nuestra pol??tica de cookies y sus elecciones, por favor <a class="cc-link" href="#yourcontactpage">contacta con nosotros</a>.',
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
