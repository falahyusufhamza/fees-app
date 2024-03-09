import { FilePdfOutlined, HomeOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons"

export const dashboardConfig = (navigate) => [
    {
        key: "menu",
        label: "Menu",
        icon: <MenuOutlined/>,
    },
    {
        key: "dashboard",
        label: "Dashboard",
        icon: <HomeOutlined/>
    },
    {
        key: "passengers",
        label: "Passengers",
        icon: <UserOutlined/>,
        onClick: () => navigate("/passengers"),
    },
    {
        key: "invoices",
        label: "Invoices",
        icon: <FilePdfOutlined/>,
        onClick: () => navigate("/invoices")
    }
]