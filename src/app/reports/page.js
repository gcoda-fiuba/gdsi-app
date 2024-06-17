'use client';

import { embedDashboard } from "@preset-sdk/embedded";
import cache from "@/app/services/cache";
import useUserStore from "@/app/store/user";
import {useEffect, useState} from "react";
import withAuth from "@/app/hoc/withAuth";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {
    Button
} from "@mui/material";

const Reports = () => {
    const {showSnackbar} = useSnackbar();
    const { getFile } = useUserStore();
    const { getReportsDashboardToken, reportsDashboardToken } = useUserStore();

    useEffect(() => {
        fetchToken();
    }, []);

    const fetchToken = async () => {
        return await getReportsDashboardToken();
    }
    function getFormattedDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }

    const downloadButtonClickHandler = async () =>{
        try{

            const fileName = "reporte-billbuddies-"+ getFormattedDateTime() +".csv";

            const content = await getFile();
            const blob = decodeBase64AndCreateBlob(content);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        catch(error){
            showSnackbar('error', "error");
            console.log(error);
        }
    }
    const decodeBase64AndCreateBlob = (base64) => {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        return new Blob([bytes], { type: 'text/csv' });
      };

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
        <>
            <Button onClick={downloadButtonClickHandler} variant="outlined">Download csv</Button>
            <div id="reports-dashboard-box" style={{ height: '100%', overflow: 'hidden'}}>
            </div>
        </>
    );
}

export default withAuth(Reports);