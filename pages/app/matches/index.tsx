import AppLayout from "../../../components/AppLayout"
import MatchOverview  from "../../../components/MatchOverview"
import { ComponentWithAuth } from "../../../components/ComponentWithAuth"

const MatchesPage: ComponentWithAuth = () => (
  <AppLayout>
    <MatchOverview />
  </AppLayout>
)
MatchesPage.requireAuth = true
export default MatchesPage