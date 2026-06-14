import { usePageTitle } from '../hooks/usePageTitle'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'

export default function Contact() {
  usePageTitle('Contact')

  return (
    <div className="pb-16">
      <PageHero
        title="Contact"
        subtitle="Open to internships, full-stack roles, and collaborative projects."
      />
      <div className="page-container">
        <ContactCard />
      </div>
    </div>
  )
}
