import React from "react";
import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

const DashboardSideBar = () => {
  const navItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Dashboard" },
    { icon: Magnifier, href: "/dashboard/recruiter/company", label: "My Company" },
    { icon: Bell, href: "/dashboard/recruiter/jobs", label: "Manage Jobs" },
    { icon: Envelope, href: "/dashboard/recruiter/jobs/new", label: "Applications" },
    { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const nabContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside>
        <div className="w-50 mr-4">{nabContent}</div>
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <Bars />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{nabContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default DashboardSideBar;
