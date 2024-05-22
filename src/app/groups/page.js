'use client'

import { useEffect, useState } from "react";
import cache from "@/app/services/cache";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button
} from "@mui/material";
import { useSnackbar } from "@/app/context/SnackbarContext";
import CreateGroup from "@/app/components/createGroup";
import Loading from "@/app/groups/loading";

import useGroupStore from "@/app/store/groups";
import { useRouter } from 'next/navigation'

export default function Group() {

  const router = useRouter();
  const { fetch } = useGroupStore()
  const { showSnackbar } = useSnackbar();

  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setGroups(await fetch())
    } catch (error) {
      showSnackbar('Error al obtener los grupos', 'error');
    }
  }

  useEffect(() => {
    if (!cache.get('token')) {
      router.replace('/');
    }

    fetchData();
    setLoading(false);
  }, [])

  const headers = ['ID', 'Nombre'];

  const handleRowClick = (idx) => {
    router.push(`/groups/${groups.at(idx).id}`);
  };

  return (
    loading ? <Loading /> :
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Group List
        </Typography>
        <CreateGroup fetchData={fetchData} />
        <TableContainer component={Paper} sx={{ maxWidth: 800, mt: 2, mb: 2 }}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headers.map((header) => <TableCell key={header}>{header}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(groups) && groups.map((group, idx) =>
                <TableRow key={group.id} hover onClick={() => handleRowClick(idx)} sx={{ cursor: 'pointer' }}>
                  <TableCell component="th" scope="row">
                    {group.id}
                  </TableCell>
                  <TableCell>{group.name}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
}
