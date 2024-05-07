'use client'

import {Suspense, useEffect, useState} from "react";
import cache from "@/app/services/cache";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {fetch} from "@/app/services/groups"
import {useSnackbar} from "@/app/context/SnackbarContext";
import CreateGroup from "@/app/components/createGroup";
import Loading from "@/app/groups/loading";

export default function Group() {
  const { showSnackbar } = useSnackbar();
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false);

  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  async function fetchData() {
    try{
      setLoading(true);
      setGroups(await fetch())
      setLoading(false);
    }catch(error){
      showSnackbar('Error al obtener los grupos', 'error');
    }
  }

  useEffect (() => {
    setLoading(true);

    if(!cache.get('token')){
      window.location.replace('/');
    }

    fetchData();
  },[])

  const headers = ['ID', 'Nombre']

  return (

        loading
          ?
            <Loading />
          :
            <section style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <CreateGroup fetchData={fetchData}/>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => <TableCell key={header}>{header}</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groups.map((row) =>
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>

  );
}