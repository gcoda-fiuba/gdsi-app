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
  Box,
} from "@mui/material";
import { useSnackbar } from "@/app/context/SnackbarContext";
import CreateGroup from "@/app/components/CreateGroup";

import useGroupStore from "@/app/store/groups";
import { useRouter } from 'next/navigation'
import Loading from "@/app/groups/loading";
import withAuth from "@/app/hoc/withAuth";

const Groups = () => {

  const router = useRouter();
  const { fetch } = useGroupStore()
  const { showSnackbar } = useSnackbar();

  const [groups, setGroups] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      await fetch().then(res => {
        setGroups(res)
        setIsLoading(false)
      })
    } catch (error) {
      showSnackbar('Error getting groups', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!cache.get('token')) {
      router.replace('/');
    }

    fetchData();
  }, [router])

  const headers = ['ID', 'Name'];

  const handleRowClick = (idx) => {
    router.push(`/groups/${groups.at(idx).id}`);
  };

  return (
    isLoading ? <Loading /> :
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <CreateGroup fetchData={fetchData} />
      <TableContainer component={Paper} sx={{ maxWidth: 800, mt: 2, mb: 2 }}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table" className="MuiTable-root">

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
                <TableCell component="th" scope="row">
                  {group.name}
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}

export default withAuth(Groups)