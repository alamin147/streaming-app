import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {  SidebarTrigger } from "@/components/ui/sidebar";
import { UserAndTheme } from "@/lib/UserAndTheme";
const AdminHeader = () => {
  return (
      <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b border-gray-800/10 dark:border-gray-100/10 pe-4">
          <div className="flex items-center gap-2 px-4">
            {<SidebarTrigger className="flex md:hidden -ml-1" />}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    <span className="text-yellow-500 font-bold">N</span>Movies
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <UserAndTheme on={true}/>
        </header>
  )
}

export default AdminHeader
