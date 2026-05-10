import { Activity } from '../../components/dashboard/Activity/Activity'
import Budget from '../../components/dashboard/Budget/BudgetOverview'
import Calendar from '../../components/dashboard/Calendar/Calendar'
import { Checklist } from '../../components/dashboard/Checklist/Checklist'
import { Community } from '../../components/dashboard/Community/Community'
import { DashboardFooter } from '../../components/dashboard/Footer/DashboardFooter'
import Explore from '../../components/dashboard/Explore/ExploreDestinations'
import { DashboardHero } from '../../components/dashboard/Hero/DashboardHero'
import { Notifications } from '../../components/dashboard/Notifications/Notifications'
import { DashboardProfile } from '../../components/dashboard/Profile/DashboardProfile'
import { Stats } from '../../components/dashboard/Stats/Stats'
import { Trips } from '../../components/dashboard/Trips/Trips'

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl pb-8">
      <DashboardHero />
      <Stats />
      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <Trips />
          <Calendar />
          <Explore />
          <Community />
        </div>
        <div className="space-y-8">
          <Budget />
          <Activity />
          <Checklist />
          <Notifications />
        </div>
      </div>
      <div className="mt-10">
        <DashboardProfile />
      </div>
      <DashboardFooter />
    </div>
  )
}
