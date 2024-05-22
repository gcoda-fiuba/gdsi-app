'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from 'react';
import MembersList from './MembersList';
import AddMemberSection from './AddMemberSection';
import ExpensesList from './ExpensesList';
import AddExpenseSection from './AddExpenseSection';
import useGroupStore from "@/app/store/groups";
import useUserStore from "@/app/store/user";

export default function GroupModal({ group, open, onClose }) {
  const { getMembers, getExpenses, getCategories } = useGroupStore();
  const { getUsers } = useUserStore();

  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
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
      const [usersData, membersData, expensesData, categoriesData] = await Promise.all([
        getUsers(),
        getMembers(group.id),
        getExpenses(group.id),
        getCategories(),
      ]);
      setUsers(usersData);
      setMembers(membersData);
      setExpenses(expensesData);
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
          <ExpensesList expenses={expenses} />
          <AddExpenseSection groupId={group?.id} categories={categories} refreshExpenses={fetchInitialData} />
        </DialogContent>
      )}
      <DialogActions>
        <Button variant = "outlined" color = "secondary" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
