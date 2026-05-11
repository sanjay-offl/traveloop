'use client'

import React from 'react'
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
import { TimezonePanel } from '../../components/dashboard/Timezone/TimezonePanel'
import Itinerary from '../../components/dashboard/Itinerary/Itinerary'

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
      <DashboardHero />
      
      <div className="grid gap-8">
        {/* Top Row: Stats Overview */}
        <Stats />
        
        {/* Main Dashboard Layout */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 space-y-8">
            <Trips />
            <Itinerary />
            <Calendar />
            <Explore />
            <Community />
          </div>

          {/* Right Column (Widgets & Utilities) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <Budget />
              <TimezonePanel destinationName="London" destinationTimezone="Europe/London" />
            </div>
            <Activity />
            <Checklist />
            <Notifications />
          </div>
        </div>
      </div>

      <div className="mt-12 pt-12 border-t border-black/5 dark:border-white/5">
        <DashboardProfile />
      </div>
      
      <DashboardFooter />
    </div>
  )
}
