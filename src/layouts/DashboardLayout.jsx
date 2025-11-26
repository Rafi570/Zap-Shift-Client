import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import { CiDeliveryTruck, CiWallet } from "react-icons/ci";
import { FaUsers, FaMotorcycle, FaCheckCircle } from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();

  const activeClass =
    "bg-primary text-secondary font-semibold rounded-lg shadow-sm";

  const baseClass =
    "w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/20 transition-all";

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content */}
      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-base-100 shadow-sm">
          {/* Mobile Menu Button */}
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <div className="px-4 flex items-center gap-2">
            <Logo />
          </div>
        </nav>

        <div className="p-5">
          <Outlet />
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-64 min-h-full bg-base-100 border-r p-4">
          <ul className="menu flex flex-col gap-2">

            {/* Homepage */}
            <li>
              <Link className={baseClass} to="/">
                <CiDeliveryTruck className="text-xl" />
                <span>Homepage</span>
              </Link>
            </li>

            {/* Payment History */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  isActive ? `${baseClass} ${activeClass}` : baseClass
                }
              >
                <CiWallet className="text-xl" />
                <span>Payment History</span>
              </NavLink>
            </li>

            {/* My Parcels */}
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className={({ isActive }) =>
                  isActive ? `${baseClass} ${activeClass}` : baseClass
                }
              >
                <FaMotorcycle className="text-xl" />
                <span>My Parcels</span>
              </NavLink>
            </li>

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className={({ isActive }) =>
                      isActive ? `${baseClass} ${activeClass}` : baseClass
                    }
                  >
                    <FaUsers className="text-xl" />
                    <span>Users Management</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/assign-riders"
                    className={({ isActive }) =>
                      isActive ? `${baseClass} ${activeClass}` : baseClass
                    }
                  >
                    <FaMotorcycle className="text-xl" />
                    <span>Assign Riders</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/approve-riders"
                    className={({ isActive }) =>
                      isActive ? `${baseClass} ${activeClass}` : baseClass
                    }
                  >
                    <FaCheckCircle className="text-xl" />
                    <span>Approve Riders</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
