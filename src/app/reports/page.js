'use client';

import { embedDashboard } from "@preset-sdk/embedded";
import cache from "@/app/services/cache";
import useUserStore from "@/app/store/user";
import {useEffect} from "react";
import withAuth from "@/app/hoc/withAuth";

const Reports = () => {
    const { getReportsDashboardToken, reportsDashboardToken } = useUserStore();

    useEffect(() => {
        fetchToken();
    }, []);

    const fetchToken = async () => {
        return await getReportsDashboardToken();
    }

    embedDashboard({
        id: "f7264cbc-3ae6-4cd1-a931-8fe050692b42", // from the Embedded dialog
        supersetDomain: "https://4e8cd7f4.us1a.app.preset.io", // from the Embedded dialog
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
        <div id="reports-dashboard-box" style={{ height: '100%', overflow: 'hidden'}}></div>
    );
}

export default withAuth(Reports);