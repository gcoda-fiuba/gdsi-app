'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from 'react';
import MembersList from './MembersList';
import AddMemberSection from './AddMemberSection';
import BillsList from './BillsList';
import AddExpenseSection from './AddExpenseSection';
import useGroupStore from "@/app/store/groups";
import useUserStore from "@/app/store/user";

export default function GroupModal({ group, open, onClose }) {
  const { getMembers, getBills, getCategories } = useGroupStore();
  const { getUsers } = useUserStore();

  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && group) {
      fetchInitialData();
    } else {
      setLoading(false);
    }
  }, [open, group]);

  const fetchInitialData = async () => {
    try {
      const [usersData, membersData, billsData, categoriesData] = await Promise.all([
        getUsers(),
        getMembers(group.id),
        getBills(group.id),
        getCategories(),
      ]);
      setUsers(usersData);
      setMembers(membersData);
      setBills(billsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to fetch initial data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Group: {group?.name}</DialogTitle>
      {!loading && (
        <DialogContent>
          <MembersList members={members} groupId={group?.id} refreshMembers={fetchInitialData} />
          <AddMemberSection users={users} groupId={group?.id} refreshMembers={fetchInitialData} />
          <BillsList bills={bills} />
          <AddExpenseSection groupId={group?.id} categories={categories} refreshBills={fetchInitialData} />
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
