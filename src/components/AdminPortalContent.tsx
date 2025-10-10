'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
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
  RefreshCw, 
  Settings, 
  TrendingUp, 
  Users, 
  BarChart3,
  AlertCircle,
  Home,
  Shield,
  Server
} from 'lucide-react';

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

export function AdminPortalContent() {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'flagged': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <Home className="w-4 h-4 sm:hidden" />
                </Button>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-semibold text-foreground">Admin Portal</span>
                  <p className="text-xs text-muted-foreground">System Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/demo">
                <Button variant="outline" size="sm">
                  <Brain className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline">Submit Case</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Submissions</p>
                  <p className="text-2xl font-bold">5,234</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs text-green-600">+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Providers</p>
                  <p className="text-2xl font-bold">847</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs text-green-600">+8.2% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Models Active</p>
                  <p className="text-2xl font-bold">5/5</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Server className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs text-green-600">All systems operational</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">2.8s</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs text-green-600">-15% faster than target</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="analytics" className="hidden lg:block">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'success', message: 'New submission approved', time: '2 minutes ago' },
                      { type: 'warning', message: 'Model response time increased', time: '15 minutes ago' },
                      { type: 'info', message: 'New provider registered', time: '1 hour ago' },
                      { type: 'success', message: 'Database backup completed', time: '2 hours ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'success' ? 'bg-green-600' :
                          activity.type === 'warning' ? 'bg-yellow-600' :
                          'bg-blue-600'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Overall system performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>API Uptime</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Database Performance</span>
                      <span className="font-medium">98.5%</span>
                    </div>
                    <Progress value={98.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Storage Usage</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Network Latency</span>
                      <span className="font-medium">45ms</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI Model Health Monitoring</CardTitle>
                    <CardDescription>Real-time status and performance of all AI models</CardDescription>
                  </div>
                  <Button size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelHealth.map((model) => (
                    <Card key={model.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Brain className="w-6 h-6 text-primary" />
                            <div>
                              <h4 className="font-semibold">{model.name}</h4>
                              <p className="text-xs text-muted-foreground">Last checked: {model.lastCheck}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(model.status)}>
                            <span className="flex items-center space-x-1">
                              {getStatusIcon(model.status)}
                              <span className="capitalize">{model.status}</span>
                            </span>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Uptime</p>
                            <p className="text-sm font-medium">{model.uptime}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Response Time</p>
                            <p className="text-sm font-medium">{model.responseTime}s</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Requests Today</p>
                            <p className="text-sm font-medium">{model.requestsToday.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Error Rate</p>
                            <p className="text-sm font-medium">{model.errorRate}%</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Progress value={model.uptime} className="h-1.5" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Submission Management</CardTitle>
                    <CardDescription>Review and manage case submissions</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
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
                          <TableCell className="font-mono text-xs">{submission.id}</TableCell>
                          <TableCell className="text-xs">{submission.timestamp}</TableCell>
                          <TableCell className="text-sm">{submission.provider}</TableCell>
                          <TableCell className="text-sm">{submission.model}</TableCell>
                          <TableCell className="text-sm">{submission.condition}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{submission.confidence}%</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{submission.region}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(submission.status)}>
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>System usage and performance analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Analytics dashboard with charts and insights will be displayed here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
