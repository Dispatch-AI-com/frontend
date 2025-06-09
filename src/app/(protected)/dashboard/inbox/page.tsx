'use client';

import { Box } from '@mui/material';
import React, { useState } from 'react';

import InboxDetail from '@/app/(protected)/dashboard/inbox/components/InboxDetail';
import InboxList from '@/app/(protected)/dashboard/inbox/components/InboxList';
import InboxSearchBar from '@/app/(protected)/dashboard/inbox/components/InboxSearchBar';
import useCallLogs from '@/app/(protected)/dashboard/inbox/hooks/useCallLogs';
import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import { useAppSelector } from '@/redux/hooks';

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('all');
  const [sort, setSort] = useState('newest');

  const user = useAppSelector(state => state.auth.user);

  // 这里可以根据实际需要传递search、tag、sort等参数
  const { data: calllogs, loading, error } = useCallLogs();

  // 默认选中第一条
  React.useEffect(() => {
    if (calllogs.length && !selectedId) {
      setSelectedId(calllogs[0]._id);
    }
  }, [calllogs, selectedId]);

  const selectedItem = calllogs.find(item => item._id === selectedId);

  if (loading || !calllogs.length) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column" bgcolor="#F8FAF7">
        {/* 显示用户信息 */}
        <Box p={2} bgcolor="#e8f5e9" borderRadius={2} mb={2}>
          {user ? (
            <>
              <strong>User:</strong> {user._id} ({user.email})
            </>
          ) : (
            <span>No user info</span>
          )}
        </Box>
        {/* 顶部搜索栏 */}
        <InboxSearchBar
          search={search}
          onSearchChange={setSearch}
          tag={tag}
          onTagChange={setTag}
          sort={sort}
          onSortChange={setSort}
        />
        {/* 主体内容 */}
        <Box flex={1} display="flex">
          {/* 左侧列表 */}
          <Box width={350} bgcolor="#fff" borderRadius={3} m={2} boxShadow={1}>
            <InboxList
              selectedId={selectedId}
              onSelect={setSelectedId}
              data={calllogs}
            />
          </Box>
          {/* 右侧详情 */}
          <Box flex={1} bgcolor="#fff" borderRadius={3} m={2} boxShadow={1}>
            <InboxDetail item={selectedItem} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
