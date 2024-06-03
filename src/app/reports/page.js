'use client';

import { embedDashboard } from "@preset-sdk/embedded";
import cache from "@/app/services/cache";
import useUserStore from "@/app/store/user";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";

export default function Reports() {
    const { getReportsDashboard } = useUserStore();
    const [reportsDashboardToken, setReportsDashboardToken] = useState(null);

    useEffect(() => {
        fetchToken().then(res => setReportsDashboardToken(res.token));
    }, []);

    const fetchToken = async () => {
        return await getReportsDashboard();
    }

    const myDashboard = embedDashboard({
        id: "7e19c962-4757-4cae-ac78-4d426263a441", // from the Embedded dialog
        supersetDomain: "https://41860ebc.us1a.app.preset.io", // from the Embedded dialog
        mountPoint: document.getElementById("reports-dashboard-box"), // any HTML element that can contain an iframe
        fetchGuestToken: () => reportsDashboardToken, // function responsible to return a guest_token
        dashboardUiConfig: {
            // reports UI config: hideTitle, hideChartControls, filters.expanded (optional)
            hideTitle: true, // change it to `true` to hide the reports title
            hideChartControls: true, // change it to `true` to hide the chart controls (ellipses menu)
            filters: {
                expanded: false, // change it to `false` so that reports filters are collapsed (for vertical filter bar only)
            },
            urlParams: { // URL parameters to be used with the ``{{url_param()}}`` Jinja macro
                user_id: cache.get('Id'),
            }, // reports UI configuration. Options: hideTitle, hideChartControls, filters.expanded, urlParams (all optional)
        },
    });

    return (
        <Box id="reports-dashboard-box" style={{ height: '100vh' }}></Box>
    );
}