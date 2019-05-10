import clsx from 'clsx'
import React, { useState } from 'react'

import useFormInput from '../hooks/useForminput'
import { validateMail, validatePhoneNumber } from '../Services/VerifForm'
import { sendMessage } from '../Services/wordpressService'

import Button from './Button'
import FormInput from './FormInput'

function validateForm(firstname: string, lastname: string, mail: string, phone: string, company: string) {
  return firstname !== '' && lastname !== '' && validateMail(mail) && validatePhoneNumber(phone) && company !== ''
}

export default function ContactTab() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isCGUaccepted = useFormInput(false)
  const message = useFormInput('')
  const firstname = useFormInput('')
  const lastname = useFormInput('')
  const mail = useFormInput('')
  const phone = useFormInput('')
  const company = useFormInput('')

  function handleNext() {
    if (
      currentIndex === 1 &&
      !(isCGUaccepted && validateForm(firstname.value, lastname.value, mail.value, phone.value, company.value))
    ) {
      window.alert('Il reste des champs à remplir')
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  async function handleSubmit() {
    if (message.value === '') {
      window.alert('Votre message est vide')
    } else {
      await sendMessage(
        'http://localhost/blogAgaetis/wp-json/agaetis/api/v1/send',
        firstname.value + ' ' + lastname.value,
        mail.value,
        message.value,
        new Date()
      )
    }
  }

  return (
    <div>
      <div className="flex flex-row md:max-w-md mx-auto px-4">
        <div
          className={clsx(
            currentIndex === 0
              ? 'text-white w-2/3'
              : currentIndex === 1
              ? 'w-1/6 text-blue md:text-dark-grey whitespace-no-wrap overflow-hidden px-4'
              : 'text-dark-grey hidden',
            'text-xs uppercase text-center md:w-1/3 py-4 md:inline bg-blue border border-white font-semibold self-center'
          )}
        >
          Votre profil
        </div>
        <div
          className={clsx(
            currentIndex > 0 ? 'bg-blue' : 'bg-grey',
            currentIndex === 1
              ? 'text-white w-2/3'
              : currentIndex === 2
              ? 'w-1/3 text-dark-grey whitespace-no-wrap overflow-hidden px-4 reverseText'
              : 'w-1/3 text-dark-grey whitespace-no-wrap overflow-hidden px-4',
            'text-xs uppercase text-center md:w-1/3 py-4 border border-white font-semibold self-center'
          )}
        >
          Vos coordonnées
        </div>
        <div
          className={clsx(
            currentIndex === 2
              ? 'bg-blue text-white w-2/3'
              : currentIndex === 1
              ? 'bg-grey text-dark-grey w-1/6 whitespace-no-wrap overflow-hidden px-4'
              : 'bg-grey text-dark-grey hidden',
            'text-xs uppercase text-center md:w-1/3 md:inline py-4 border border-white font-semibold self-center'
          )}
        >
          Votre message
        </div>
      </div>
      <div className="border border-white md:max-w-md mx-auto px-4">
        <div className="bg-grey py-8 md:p-12 flex flex-col justify-center">
          <h2 className={clsx({ hidden: currentIndex !== 0 }, 'text-center text-lg md:text-2xl md:mt-0')}>
            Votre demande concerne...
          </h2>
          <h2 className={clsx({ hidden: currentIndex !== 1 }, 'text-center text-lg md:text-2xl md:mt-0')}>
            Saisissez vos coordonnées :
          </h2>
          <h2 className={clsx({ hidden: currentIndex !== 2 }, 'text-center text-lg md:text-2xl md:mt-0')}>
            Saisissez votre message :
          </h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-center">
              <div className={clsx({ hidden: currentIndex !== 0 }, 'my-2 md:m-0')}>
                <input type="radio" name="radio" id="radio1" value="Un projet ?" className="hidden" />
                <Button
                  className="border border-blue rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer text-blue font-semibold text-xss uppercase radio"
                  htmlFor="radio1"
                  onClick={handleNext}
                >
                  Un projet ?
                </Button>
              </div>
              <div className={clsx({ hidden: currentIndex !== 0 }, 'my-2 md:m-0')}>
                <input type="radio" name="radio" id="radio2" value="Une candidature ?" className="hidden" />
                <Button
                  className="border border-blue rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer text-blue font-semibold text-xss uppercase radio"
                  htmlFor="radio2"
                  onClick={handleNext}
                >
                  Une candidature ?
                </Button>
              </div>
              <div className={clsx({ hidden: currentIndex !== 0 }, 'my-2 md:m-0')}>
                <input type="radio" name="radio" id="radio3" value="Un cafe ?" className="hidden" />
                <Button
                  className="border border-blue rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer text-blue font-semibold text-xss uppercase radio"
                  htmlFor="radio3"
                  onClick={handleNext}
                >
                  Un café ?
                </Button>
              </div>
            </div>
            <div className={clsx({ hidden: currentIndex !== 1 }, 'block w-full justify-center')}>
              <FormInput id="firstname" type="text" placeholder="Votre prénom" onChange={firstname.onChange}>
                Prénom
              </FormInput>
              <FormInput id="lastname" type="text" placeholder="Votre nom" onChange={lastname.onChange}>
                Nom
              </FormInput>
              <FormInput id="mail" type="email" placeholder="name@example.com" onChange={mail.onChange}>
                E-mail
              </FormInput>
              <FormInput id="phone" type="text" placeholder="Votre téléphone" onChange={phone.onChange}>
                Téléphone
              </FormInput>
              <FormInput id="company" type="text" placeholder="Votre société" onChange={company.onChange}>
                Société
              </FormInput>
              <div className="p-2 flex flex-row align-middle">
                <input className="opacity-75" id="cgu" type="checkbox" onChange={isCGUaccepted.onChange} required />
                <label className="block text-cgu ml-1" htmlFor="cgu">
                  En soumettant ce formulaire et conformément à la politique de traitement des données personnelles,
                  j'accepte que les informations saisies soient exploitées afin d'être contacté par les équipes
                  d'agaetis.
                </label>
              </div>
            </div>
            <div className={clsx({ hidden: currentIndex !== 2 }, 'p-2')}>
              <label className="block text-xss font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="shadow appearance-none rounded-sm text-xs w-full h-32 overflow-y-scroll py-2 px-3 text-dark-grey leading-tight"
                id="message"
                placeholder="Votre message"
                onChange={message.onChange}
              />
            </div>
            <div className="flex flex-col justify-center">
              <Button
                href="#"
                className={clsx(
                  { hidden: currentIndex !== 1 },
                  'w-32 py-2 leading-none rounded-full uppercase mx-auto text-center mt-4 mb-6 md:mb-0 bg-orange text-white text-xs font-semibold inline-block'
                )}
                onClick={handleNext}
              >
                Poursuivre
              </Button>
              <Button
                type="submit"
                className={clsx(
                  { hidden: currentIndex !== 2 },
                  'w-32 py-2 leading-none rounded-full uppercase mx-auto mt-4 mb-6 md:mb-0 bg-orange text-white text-xs text-center font-semibold inline-block'
                )}
              >
                Valider
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
