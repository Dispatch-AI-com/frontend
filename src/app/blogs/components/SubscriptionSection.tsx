"use client";
import { Alert, Box, Button, Grid, Snackbar,styled, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const SubscriptionWrapper = styled(Box)(() => ({
  background: '#111',
  borderRadius: 0,
  padding: '64px 0 48px 0',
  textAlign: 'center',
  marginTop: 0,
}));

const FormRow = styled(Grid)(() => ({
  margin: '32px auto 0 auto',
  maxWidth: 600,
}));

const Label = styled(Typography)(() => ({
  color: '#fff',
  fontWeight: 400,
  fontSize: 14,
  textAlign: 'left',
  marginBottom: 4,
}));

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export default function SubscriptionSection() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // 验证邮箱
    if (!formData.email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    // 验证姓名
    if (!formData.firstName) {
      newErrors.firstName = '请输入名字';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = '请输入姓氏';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除对应字段的错误
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 这里可以替换为实际的API调用
      
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 成功处理
      setFormData({ email: '', firstName: '', lastName: '' });
      setShowSuccess(true);
    } catch (error) {
      console.error('提交表单时出错:', error);
      // 可以在这里添加错误处理逻辑
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SubscriptionWrapper>
      <Typography variant="h4" fontWeight={700} color="#fff" gutterBottom>
        Subscription
      </Typography>
      <Typography variant="body2" color="#fff" sx={{ opacity: 0.7 }}>
        Enter your credentials to access your account
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormRow container spacing={2}>
          <Grid item xs={12}>
            <Label>Email address</Label>
            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              size="small"
              placeholder="Email address"
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
              InputProps={{ style: { background: '#fff' } }}
              error={!!errors.email}
              helperText={errors.email}
              FormHelperTextProps={{ sx: { color: '#ff6b6b' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <Label>First Name</Label>
            <TextField
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              size="small"
              placeholder="First Name"
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
              InputProps={{ style: { background: '#fff' } }}
              error={!!errors.firstName}
              helperText={errors.firstName}
              FormHelperTextProps={{ sx: { color: '#ff6b6b' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <Label>Last Name</Label>
            <TextField
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              size="small"
              placeholder="Last Name"
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
              InputProps={{ style: { background: '#fff' } }}
              error={!!errors.lastName}
              helperText={errors.lastName}
              FormHelperTextProps={{ sx: { color: '#ff6b6b' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ 
                bgcolor: '#fff', 
                color: '#111', 
                fontWeight: 700, 
                borderRadius: 1, 
                mt: 2, 
                minWidth: 160,
                '&:hover': {
                  bgcolor: '#f0f0f0',
                }
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </Button>
          </Grid>
        </FormRow>
      </form>
      
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          订阅成功！感谢您的关注。
        </Alert>
      </Snackbar>
    </SubscriptionWrapper>
  );
}
