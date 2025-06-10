import AccountLayout from '../components/account/AccountLayout';

const ProfilePageTest = () => {
  const breadcrumbs = [
    { label: 'Tài khoản', path: '/tai-khoan' },
    { label: 'Thông tin cá nhân' }
  ];

  return (
    <AccountLayout title="Thông tin tài khoản" breadcrumbs={breadcrumbs}>
      <div style={{ padding: '20px' }}>
        <h3>Test Content</h3>
        <p>Đây là nội dung test để kiểm tra AccountLayout</p>
      </div>
    </AccountLayout>
  );
};

export default ProfilePageTest;
