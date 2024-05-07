'use client'

import { Suspense } from 'react'
import {useEffect, useState} from "react";
import cache from "@/app/services/cache";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {fetch} from "@/app/services/groups"
import {useSnackbar} from "@/app/context/SnackbarContext";
import Loading from "@/app/groups/loading";

export default function Group() {
  const { showSnackbar } = useSnackbar();
  const [groups, setGroups] = useState([])

  useEffect (() => {
    if(!cache.get('token')){
      window.location.replace('/');
    }
    async function fetchData() {
      try{
        setGroups(await fetch())
      }catch(error){
        showSnackbar('Error al obtener los grupos', 'error');
      }
    }
    fetchData();
  },[])

  const headers = ['ID', 'Nombre']

  return (
    <Suspense fallback={<Loading />}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Suspense>
  )
}