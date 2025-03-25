import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../src/components/nav/NavBar"
import { NurseryList } from "../src/components/nurseries/NurseryList"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route path="nurseries" element={ <NurseryList /> } />
                <Route path="distributors" element={ <></> } />
                <Route path="retailers" element={ <></> } />
            </Route>
        </Routes>
    )
}