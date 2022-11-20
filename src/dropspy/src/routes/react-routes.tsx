import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { DROPSPY_BASE_ROUTE } from "../configs/configs"

import { ShowOnlyToLogedInUsers, ShowOnlyToAdminUsers } from "../features/Authentication"

import { AllDates, SingleDate } from '../features/Dates'
import { AllStores, SingleStore } from '../features/Stores'
import { AllProducts, SingleProduct } from '../features/Products'
import { AllLabels, SingleLabel } from '../features/Labels'
import { AllCategories, SingleCategory } from '../features/Categories/'
import { UserPreferences } from "../features/Users"
import { Dashboard } from "../features/Dashboard"
import { Bots } from "../features/Bots"
import { Admin } from "../features/Admin"
import { Login } from "../features/Login"

export const AppRouter = () => {

  return (
    <BrowserRouter basename={DROPSPY_BASE_ROUTE}>
      <Routes>

        <Route path="login" element={<Login />} />

        <Route path="/" element={<ShowOnlyToLogedInUsers />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="user" element={<UserPreferences />} />

          <Route path="stores" element={<AllStores />} />
          <Route path="stores/view" element={<SingleStore />} />

          <Route path="dates" element={<AllDates />} />
          <Route path="dates/view" element={<SingleDate />} />

          <Route path="products" element={<AllProducts />} />
          <Route path="products/view" element={<SingleProduct />} />

          <Route path="labels" element={<AllLabels />} />
          <Route path="labels/view" element={<SingleLabel />} />

          <Route path="categories" element={<AllCategories />} />
          <Route path="categories/view" element={<SingleCategory />} />
        </Route>

        <Route path="/" element={<ShowOnlyToAdminUsers />}>
          <Route path="bots" element={<Bots />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  )
}
