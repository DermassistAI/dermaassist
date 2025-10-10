import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { 
  ArrowLeft, 
  Brain, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  Download, 
  Eye, 
  Filter, 
  MoreHorizontal, 
  Play, 
  Pause, 
  RefreshCw, 
  Settings, 
  TrendingUp, 
  Users, 
  Zap,
  BarChart3,
  Calendar,
  MapPin,
  AlertCircle,
  Search,
  FileText,
  Key,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Menu,
  Shield,
  Server,
  UserCog
} from 'lucide-react';

interface AdminPortalProps {
  onNavigate: (view: 'landing' | 'submission' | 'feed' | 'admin', type?: 'provider' | 'admin') => void;
}

interface ModelHealth {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'error';
  uptime: number;
  responseTime: number;
  requestsToday: number;
  errorRate: number;
  lastCheck: string;
}

interface Submission {
  id: string;
  timestamp: string;
  provider: string;
  model: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  condition: string;
  confidence: number;
  region: string;
}

interface Issue {
  id: string;
  type: 'model_error' | 'quality_issue' | 'security_alert' | 'system_issue';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'in_progress' | 'resolved' | 'false_positive';
  model?: string;
  timestamp: string;
}

const modelHealth: ModelHealth[] = [
  {
    id: 'claude',
    name: 'Claude 4.5',
    status: 'active',
    uptime: 99.8,
    responseTime: 2.3,
    requestsToday: 847,
    errorRate: 0.2,
    lastCheck: '2 minutes ago'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    status: 'active',
    uptime: 99.9,
    responseTime: 1.8,
    requestsToday: 623,
    errorRate: 0.1,
    lastCheck: '1 minute ago'
  },
  {
    id: 'gpt5',
    name: 'GPT-5',
    status: 'warning',
    uptime: 98.2,
    responseTime: 4.1,
    requestsToday: 1205,
    errorRate: 1.8,
    lastCheck: '3 minutes ago'
  },
  {
    id: 'gpt5-mini',
    name: 'GPT-5 Mini',
    status: 'active',
    uptime: 99.7,
    responseTime: 1.2,
    requestsToday: 2341,
    errorRate: 0.3,
    lastCheck: '1 minute ago'
  },
  {
    id: 'qwen',
    name: 'Qwen',
    status: 'error',
    uptime: 94.5,
    responseTime: 8.2,
    requestsToday: 89,
    errorRate: 5.5,
    lastCheck: '15 minutes ago'
  }
];

const submissions: Submission[] = [
  {
    id: 'SUB-001',
    timestamp: '2024-03-15 14:30',
    provider: 'Dr. Johnson',
    model: 'Claude 4.5',
    status: 'approved',
    condition: 'Atopic Dermatitis',
    confidence: 87,
    region: 'West Africa'
  },
  {
    id: 'SUB-002',
    timestamp: '2024-03-15 14:25',
    provider: 'Dr. Okafor',
    model: 'GPT-5',
    status: 'pending',
    condition: 'Vitiligo',
    confidence: 94,
    region: 'East Africa'
  },
  {
    id: 'SUB-003',
    timestamp: '2024-03-15 14:20',
    provider: 'Dr. Hassan',
    model: 'Gemini',
    status: 'flagged',
    condition: 'Psoriasis',
    confidence: 76,
    region: 'North Africa'
  },
  {
    id: 'SUB-004',
    timestamp: '2024-03-15 14:15',
    provider: 'Dr. Mengesha',
    model: 'Claude 4.5',
    status: 'approved',
    condition: 'Eczema',
    confidence: 91,
    region: 'East Africa'
  },
  {
    id: 'SUB-005',
    timestamp: '2024-03-15 14:10',
    provider: 'Dr. Williams',
    model: 'GPT-5 Mini',
    status: 'rejected',
    condition: 'Contact Dermatitis',
    confidence: 52,
    region: 'Southern Africa'
  }
];

const issues: Issue[] = [
  {
    id: 'ISS-001',
    type: 'model_error',
    title: 'GPT-5 High Error Rate',
    description: 'Error rate increased to 1.8% over the last 2 hours',
    severity: 'medium',
    status: 'in_progress',
    model: 'GPT-5',
    timestamp: '2024-03-15 13:45'
  },
  {
    id: 'ISS-002',
    type: 'model_error',
    title: 'Qwen Service Degradation',
    description: 'Response times over 8 seconds, multiple timeouts reported',
    severity: 'high',
    status: 'new',
    model: 'Qwen',
    timestamp: '2024-03-15 14:00'
  },
  {
    id: 'ISS-003',
    type: 'quality_issue',
    title: 'Low Confidence Submissions',
    description: 'Multiple submissions with confidence below 60%',
    severity: 'low',
    status: 'resolved',
    timestamp: '2024-03-15 12:30'
  },
  {
    id: 'ISS-004',
    type: 'security_alert',
    title: 'Unusual Access Pattern',
    description: 'Detected unusual API access patterns from IP range',
    severity: 'critical',
    status: 'new',
    timestamp: '2024-03-15 14:15'
  }
];

interface ApiKey {
  id: string;
  model: string;
  provider: string;
  createdAt: string;
  lastUsed?: string;
  hasKey: boolean;
}

interface ModelProvider {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
  models: string[];
  isActive: boolean;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export function AdminPortal({ onNavigate }: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'submissions' | 'models' | 'issues' | 'analytics' | 'api-keys' | 'providers' | 'users'>('dashboard');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newApiKey, setNewApiKey] = useState({ model: '', provider: '', key: '', endpoint: '' });
  const [isAddingApiKey, setIsAddingApiKey] = useState(false);
  
  // Model Providers state
  const [modelProviders, setModelProviders] = useState<ModelProvider[]>([]);
  const [newProvider, setNewProvider] = useState({ name: '', description: '', baseUrl: '', models: [''], isActive: true });
  const [isAddingProvider, setIsAddingProvider] = useState(false);
  
  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handler functions for API Keys
  const handleAddApiKey = () => {
    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      model: newApiKey.model,
      provider: newApiKey.provider,
      createdAt: new Date().toLocaleDateString(),
      hasKey: true
    };
    setApiKeys([...apiKeys, newKey]);
    setNewApiKey({ model: '', provider: '', key: '', endpoint: '' });
    setIsAddingApiKey(false);
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  // Handler functions for Model Providers
  const handleAddProvider = () => {
    const provider: ModelProvider = {
      id: crypto.randomUUID(),
      name: newProvider.name,
      description: newProvider.description,
      baseUrl: newProvider.baseUrl,
      models: newProvider.models.filter(model => model.trim() !== ''),
      isActive: newProvider.isActive,
      createdAt: new Date().toLocaleDateString()
    };
    setModelProviders([...modelProviders, provider]);
    setNewProvider({ name: '', description: '', baseUrl: '', models: [''], isActive: true });
    setIsAddingProvider(false);
  };

  const handleDeleteProvider = (id: string) => {
    setModelProviders(modelProviders.filter(provider => provider.id !== id));
  };

  // Handler functions for Users
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
  };

  // Initialize mock data
  useEffect(() => {
    // Initialize mock API keys
    setApiKeys([
      {
        id: '1',
        model: 'Claude 4.5',
        provider: 'anthropic',
        createdAt: '2024-01-15',
        lastUsed: '2024-01-20',
        hasKey: true
      },
      {
        id: '2',
        model: 'GPT-5',
        provider: 'openai',
        createdAt: '2024-01-10',
        lastUsed: '2024-01-20',
        hasKey: true
      }
    ]);

    // Initialize mock providers
    setModelProviders([
      {
        id: '1',
        name: 'OpenAI',
        description: 'Leading AI research company',
        baseUrl: 'https://api.openai.com/v1',
        models: ['GPT-5', 'GPT-5 Mini'],
        isActive: true,
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        name: 'Anthropic',
        description: 'AI safety focused company',
        baseUrl: 'https://api.anthropic.com/v1',
        models: ['Claude 4.5'],
        isActive: true,
        createdAt: '2024-01-02'
      }
    ]);

    // Initialize mock users
    setUsers([
      {
        id: '1',
        email: 'admin@dermassist.com',
        name: 'Admin User',
        role: 'admin',
        isActive: true,
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        email: 'dr.smith@hospital.com',
        name: 'Dr. Sarah Smith',
        role: 'provider',
        isActive: true,
        createdAt: '2024-01-15'
      }
    ]);
  }, []);





  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onNavigate('landing')} className="hidden sm:flex">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('landing')} className="sm:hidden">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-semibold text-foreground">Admin Portal</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="hidden sm:inline-flex">Admin</Badge>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Admin Navigation</SheetTitle>
                    <SheetDescription>
                      Navigate between admin sections
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {[
                      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                      { id: 'submissions', label: 'Submissions', icon: FileText },
                      { id: 'models', label: 'Model Health', icon: Brain },
                      { id: 'api-keys', label: 'API Keys', icon: Key },
                      { id: 'providers', label: 'Providers', icon: Server },
                      { id: 'users', label: 'Users', icon: Users },
                      { id: 'issues', label: 'Issues', icon: AlertCircle },
                      { id: 'analytics', label: 'Analytics', icon: TrendingUp }
                    ].map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <tab.icon className="mr-2 w-4 h-4" />
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-4 sm:space-y-6">
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="providers">Providers</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Mobile/Tablet Navigation */}
          <div className="lg:hidden">
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                <TabsTrigger value="dashboard" className="px-3">Dashboard</TabsTrigger>
                <TabsTrigger value="submissions" className="px-3">Submissions</TabsTrigger>
                <TabsTrigger value="models" className="px-3">Models</TabsTrigger>
                <TabsTrigger value="api-keys" className="px-3">Keys</TabsTrigger>
                <TabsTrigger value="providers" className="px-3">Providers</TabsTrigger>
                <TabsTrigger value="users" className="px-3">Users</TabsTrigger>
                <TabsTrigger value="issues" className="px-3">Issues</TabsTrigger>
                <TabsTrigger value="analytics" className="px-3">Analytics</TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">System Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor system health, submissions, and model performance
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">4/5</p>
                      <p className="text-sm text-muted-foreground">Models Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Database className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">5,105</p>
                      <p className="text-sm text-muted-foreground">Total Submissions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-sm text-muted-foreground">Pending Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-muted-foreground">Active Issues</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health Overview */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Health Summary</CardTitle>
                  <CardDescription>Current status of all AI models</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {modelHealth.slice(0, 3).map((model) => (
                    <div key={model.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          model.status === 'active' ? 'bg-green-500' :
                          model.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="font-medium">{model.name}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{model.uptime}% uptime</span>
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('models')}>
                    View All Models
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Issues</CardTitle>
                  <CardDescription>Latest system alerts and issues</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {issues.filter(i => i.status === 'new' || i.status === 'in_progress').slice(0, 3).map((issue) => (
                    <div key={issue.id} className="flex items-start space-x-3">
                      <AlertCircle className={`w-5 h-5 mt-0.5 ${
                        issue.severity === 'critical' ? 'text-red-500' :
                        issue.severity === 'high' ? 'text-orange-500' :
                        issue.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{issue.title}</p>
                        <p className="text-xs text-muted-foreground">{issue.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity}
                          </Badge>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('issues')}>
                    View All Issues
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Latest case submissions requiring review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{submission.id}</span>
                          <span className="text-xs text-muted-foreground">{submission.timestamp}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm">{submission.provider}</span>
                          <span className="text-xs text-muted-foreground">{submission.model}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm">{submission.condition}</span>
                          <span className="text-xs text-muted-foreground">{submission.confidence}% confidence</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{submission.region}</Badge>
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Case Submissions</h1>
                <p className="text-muted-foreground">Review and manage case submissions</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Filter className="mr-2 w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.id}</TableCell>
                        <TableCell>{submission.timestamp}</TableCell>
                        <TableCell>{submission.provider}</TableCell>
                        <TableCell>{submission.model}</TableCell>
                        <TableCell>{submission.condition}</TableCell>
                        <TableCell>{submission.confidence}%</TableCell>
                        <TableCell>{submission.region}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Model Health Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Model Health</h1>
                <p className="text-muted-foreground">Monitor AI model performance and health</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <RefreshCw className="mr-2 w-4 h-4" />
                  Refresh All
                </Button>
                <Button>
                  <Settings className="mr-2 w-4 h-4" />
                  Configure
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {modelHealth.map((model) => (
                <Card key={model.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="w-5 h-5" />
                        <span>{model.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Uptime</p>
                        <p className="text-2xl font-bold">{model.uptime}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Response Time</p>
                        <p className="text-2xl font-bold">{model.responseTime}s</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Requests Today</p>
                        <p className="text-2xl font-bold">{model.requestsToday.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Error Rate</p>
                        <p className="text-2xl font-bold">{model.errorRate}%</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Check: {model.lastCheck}</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Issue Management</h1>
                <p className="text-muted-foreground">Track and resolve system issues</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Issues</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Create Issue</Button>
              </div>
            </div>

            <div className="space-y-4">
              {issues.map((issue) => (
                <Card key={issue.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <AlertCircle className={`w-6 h-6 mt-1 ${
                          issue.severity === 'critical' ? 'text-red-500' :
                          issue.severity === 'high' ? 'text-orange-500' :
                          issue.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                        }`} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{issue.title}</h3>
                          <p className="text-muted-foreground mb-3">{issue.description}</p>
                          <div className="flex items-center space-x-4">
                            <Badge className={getSeverityColor(issue.severity)}>
                              {issue.severity}
                            </Badge>
                            <Badge className={getStatusColor(issue.status)}>
                              {issue.status.replace('_', ' ')}
                            </Badge>
                            {issue.model && (
                              <Badge variant="outline">{issue.model}</Badge>
                            )}
                            <span className="text-sm text-muted-foreground">{issue.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Assign</Button>
                        <Button size="sm">Resolve</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
                <p className="text-muted-foreground">System usage and performance analytics</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="mr-2 w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">5,105</p>
                      <p className="text-sm text-muted-foreground">Total Submissions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">847</p>
                      <p className="text-sm text-muted-foreground">Active Providers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-sm text-muted-foreground">Countries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">89.3%</p>
                      <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Trends</CardTitle>
                  <CardDescription>Daily submission volume over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Usage</CardTitle>
                  <CardDescription>Distribution of AI model selection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modelHealth.map((model) => (
                      <div key={model.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{model.name}</span>
                          <span>{Math.round((model.requestsToday / 5105) * 100)}%</span>
                        </div>
                        <Progress value={(model.requestsToday / 5105) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Submissions by region</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { region: 'West Africa', count: 1847, percentage: 36 },
                    { region: 'East Africa', count: 1432, percentage: 28 },
                    { region: 'Southern Africa', count: 918, percentage: 18 },
                    { region: 'North Africa', count: 653, percentage: 13 },
                    { region: 'Central Africa', count: 255, percentage: 5 }
                  ].map((item) => (
                    <div key={item.region} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.region}</span>
                        <span>{item.count} ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Conditions</CardTitle>
                  <CardDescription>Most frequently diagnosed conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { condition: 'Atopic Dermatitis', count: 1203 },
                    { condition: 'Vitiligo', count: 891 },
                    { condition: 'Psoriasis', count: 782 },
                    { condition: 'Eczema', count: 654 },
                    { condition: 'Contact Dermatitis', count: 432 }
                  ].map((item) => (
                    <div key={item.condition} className="flex justify-between items-center">
                      <span className="text-sm">{item.condition}</span>
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">API Key Management</h1>
                <p className="text-muted-foreground">Manage API keys for AI model providers</p>
              </div>
              <Dialog open={isAddingApiKey} onOpenChange={setIsAddingApiKey}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 w-4 h-4" />
                    Add API Key
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New API Key</DialogTitle>
                    <DialogDescription>
                      Add a new API key for an AI model provider
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="model">Model Name</Label>
                      <Input
                        id="model"
                        placeholder="e.g. GPT-5"
                        value={newApiKey.model}
                        onChange={(e) => setNewApiKey({...newApiKey, model: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider">Provider</Label>
                      <Select value={newApiKey.provider} onValueChange={(value) => setNewApiKey({...newApiKey, provider: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI</SelectItem>
                          <SelectItem value="anthropic">Anthropic</SelectItem>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="alibaba">Alibaba</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="key">API Key</Label>
                      <Input
                        id="key"
                        type="password"
                        placeholder="Enter API key"
                        value={newApiKey.key}
                        onChange={(e) => setNewApiKey({...newApiKey, key: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endpoint">Custom Endpoint (Optional)</Label>
                      <Input
                        id="endpoint"
                        placeholder="https://api.provider.com/v1"
                        value={newApiKey.endpoint}
                        onChange={(e) => setNewApiKey({...newApiKey, endpoint: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingApiKey(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddApiKey} disabled={!newApiKey.model || !newApiKey.provider || !newApiKey.key}>
                      <Save className="mr-2 w-4 h-4" />
                      Save Key
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Key className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold">{apiKey.model}</h3>
                          <Badge variant="outline">{apiKey.provider}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Created: {apiKey.createdAt}
                          {apiKey.lastUsed && ` • Last used: ${apiKey.lastUsed}`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={apiKey.hasKey ? "secondary" : "destructive"}>
                          {apiKey.hasKey ? "Active" : "Missing Key"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteApiKey(apiKey.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Model Providers Tab */}
          <TabsContent value="providers" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Model Providers</h1>
                <p className="text-muted-foreground">Manage AI model providers and configurations</p>
              </div>
              <Dialog open={isAddingProvider} onOpenChange={setIsAddingProvider}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 w-4 h-4" />
                    Add Provider
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Model Provider</DialogTitle>
                    <DialogDescription>
                      Add a new AI model provider to the system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Provider Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g. OpenAI"
                        value={newProvider.name}
                        onChange={(e) => setNewProvider({...newProvider, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of the provider"
                        value={newProvider.description}
                        onChange={(e) => setNewProvider({...newProvider, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="baseUrl">Base URL</Label>
                      <Input
                        id="baseUrl"
                        placeholder="https://api.provider.com/v1"
                        value={newProvider.baseUrl}
                        onChange={(e) => setNewProvider({...newProvider, baseUrl: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Available Models</Label>
                      {newProvider.models.map((model, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder="Model name"
                            value={model}
                            onChange={(e) => {
                              const updatedModels = [...newProvider.models];
                              updatedModels[index] = e.target.value;
                              setNewProvider({...newProvider, models: updatedModels});
                            }}
                          />
                          {index === newProvider.models.length - 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setNewProvider({...newProvider, models: [...newProvider.models, '']})}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newProvider.isActive}
                        onCheckedChange={(checked) => setNewProvider({...newProvider, isActive: checked})}
                      />
                      <Label>Active</Label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingProvider(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddProvider} disabled={!newProvider.name || !newProvider.baseUrl}>
                      <Save className="mr-2 w-4 h-4" />
                      Save Provider
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {modelProviders.map((provider) => (
                <Card key={provider.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Server className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={provider.isActive ? "secondary" : "outline"}>
                          {provider.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProvider(provider.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{provider.description}</p>
                    <div>
                      <Label className="text-xs text-muted-foreground">Base URL</Label>
                      <p className="text-sm font-mono bg-muted px-2 py-1 rounded">{provider.baseUrl}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Models ({provider.models.length})</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {provider.models.map((model, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {model}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Created: {provider.createdAt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">User Management</h1>
                <p className="text-muted-foreground">Manage user accounts and permissions</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Filter className="mr-2 w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.isActive ? 'secondary' : 'outline'}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setEditingUser(user)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Shield className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Mobile User Cards */}
            <div className="md:hidden space-y-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setEditingUser(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <Badge variant={user.isActive ? 'secondary' : 'outline'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{user.createdAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Edit User Dialog */}
            <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                  <DialogDescription>
                    Update user information and permissions
                  </DialogDescription>
                </DialogHeader>
                {editingUser && (
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="userName">Name</Label>
                      <Input
                        id="userName"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userEmail">Email</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userRole">Role</Label>
                      <Select 
                        value={editingUser.role} 
                        onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="provider">Provider</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editingUser.isActive}
                        onCheckedChange={(checked) => setEditingUser({...editingUser, isActive: checked})}
                      />
                      <Label>Active</Label>
                    </div>
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingUser(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => editingUser && handleUpdateUser(editingUser)}>
                    <Save className="mr-2 w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}