import {Skeleton} from "@mui/material";

export default function Loading() {
    return (
        <section style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1>Loading...</h1>
            <Skeleton />
        </section>
    );
}