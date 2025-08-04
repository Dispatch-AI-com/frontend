# Service Management Components

## CustomFormModal

### 功能描述
CustomFormModal是一个用于创建和编辑自定义表单字段的模态对话框组件。它允许用户定义表单字段的类型、标签和必填属性。

### 主要功能
1. **字段类型选择**: 支持多种字段类型，每个类型都有对应的图标
   - Short answer (短答案) - 等号图标
   - Paragraph (段落) - 三条横线图标
   - Drop-down list (下拉列表) - 向下箭头图标
   - Single-choice question (单选题) - 圆形单选按钮图标
   - Multiple-choice questions (多选题) - 方形复选框图标
   - Date (日期) - 日历图标
   - Time (时间) - 时钟图标

2. **字段管理**:
   - 添加新字段
   - 复制现有字段
   - 删除字段
   - 设置字段标签（占位符：label name）
   - 设置必填属性

3. **选项管理** (适用于dropdown、single-choice、multiple-choice类型):
   - 添加选项
   - 编辑选项内容
   - 删除选项
   - 动态选项编号

4. **用户界面**:
   - 响应式设计，支持移动端
   - 现代化的UI设计
   - 直观的操作界面
   - 无表头设计，直接显示字段类型选择器
   - 选项功能支持（Add Option按钮）

### 使用方法

#### 在EditServiceModal中集成
```tsx
import CustomFormModal from './CustomFormModal';

// 在组件中添加状态
const [isCustomFormModalOpen, setIsCustomFormModalOpen] = useState(false);

// 处理打开自定义表单模态框
const handleCustomFormSetup = () => {
  setIsCustomFormModalOpen(true);
};

// 处理关闭自定义表单模态框
const handleCloseCustomFormModal = () => {
  setIsCustomFormModalOpen(false);
};

// 处理保存自定义表单
const handleSaveCustomForm = (fields: FormField[]) => {
  // 处理保存逻辑
  console.log('Custom form fields:', fields);
};

// 在JSX中渲染
<CustomFormModal
  open={isCustomFormModalOpen}
  onClose={handleCloseCustomFormModal}
  onSave={handleSaveCustomForm}
/>
```

#### 接口定义
```tsx
interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface CustomFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (fields: FormField[]) => void;
}
```

### 样式特点
- 使用Material-UI组件库
- 响应式设计，适配不同屏幕尺寸
- 统一的颜色主题和间距
- 平滑的动画效果

### 集成位置
该组件已集成到Service Management页面的EditServiceModal中，通过"Set it up"按钮触发。

### 文件结构
```
components/
├── CustomFormModal.tsx          # 自定义表单模态框组件
├── EditServiceModal.tsx         # 编辑服务模态框（已集成CustomFormModal）
└── README.md                   # 说明文档
``` 