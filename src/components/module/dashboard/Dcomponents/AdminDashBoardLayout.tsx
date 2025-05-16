"use client"
import { Card, CardContent } from "@/components/ui/card"
import { GetAllInfoAdmin, GetAllPersonalInfo } from "@/services/dashbaord"
import { useEffect, useState } from "react"

// Define types
interface DashboardData {
  totalUsers?: number
  totalResearchMembers?: number
  totalBlogs?: number
  totalApprovedPapers?: number
  totalPendingPapers?: number
  totalResearchPapers?: number
}

const AdminDashBoardLayout = () => {
  const [allInfo, setAllInfo] = useState<DashboardData | null>(null)
  const [result, setResult] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personalInfo = await GetAllPersonalInfo()
        const adminInfo = await GetAllInfoAdmin()

        setResult(personalInfo?.data || null)
        setAllInfo(adminInfo?.data || null)
      } catch (err) {
        setError("Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <Card className="rounded-xl bg-muted mt-4 flex justify-center items-center">
        <CardContent className="text-center">
          <h2 className="text-2xl font-bold">Dashboard Insights</h2>
        </CardContent>
      </Card>

      <div className="grid auto-rows-min mt-4 gap-4 md:grid-cols-3">
        <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-3xl font-semibold">{allInfo?.totalUsers ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold">Total Research Members</h2>
            <p className="text-3xl font-semibold">{allInfo?.totalResearchMembers ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold">Total Blogs</h2>
            <p className="text-3xl font-semibold">{allInfo?.totalBlogs ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold">Total Approved Papers</h2>
            <p className="text-3xl font-semibold">{allInfo?.totalApprovedPapers ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold">Total Pending Papers</h2>
            <p className="text-3xl font-semibold">{allInfo?.totalPendingPapers ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold">Total Research Papers</h2>
            <p className="text-3xl font-semibold">{allInfo?.totalResearchPapers ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="rounded-xl bg-muted mt-4 flex justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-2xl font-bold">Personal Insights</h2>
          </CardContent>
        </Card>

        <div className="grid mt-4 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
            <CardContent className="text-center">
              <h2 className="text-xl font-bold">Total Approved Papers</h2>
              <p className="text-3xl font-semibold">{result?.totalApprovedPapers ?? 0}</p>
            </CardContent>
          </Card>
          <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
            <CardContent className="text-center">
              <h2 className="text-xl font-bold">Total Pending Papers</h2>
              <p className="text-3xl font-semibold">{result?.totalPendingPapers ?? 0}</p>
            </CardContent>
          </Card>
          <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
            <CardContent className="text-center">
              <h2 className="text-xl font-bold">Total Blogs</h2>
              <p className="text-3xl font-semibold">{result?.totalBlogs ?? 0}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoardLayout
