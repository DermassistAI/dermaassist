import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Brain, 
  Trophy, 
  Target, 
  Flame, 
  Award, 
  Users, 
  MessageCircle, 
  Eye,
  TrendingUp,
  CheckCircle,
  Clock,
  User,
  X,
  Home
} from 'lucide-react';

interface PracticeFeedProps {
  onNavigate: (view: 'landing' | 'submission' | 'feed' | 'admin', type?: 'provider' | 'admin') => void;
}

interface CaseData {
  id: string;
  image: string;
  ageRange: string;
  symptoms: string;
  duration: string;
  region: string;
  consensus: string;
  confidence: number;
  submissions: number;
  correctDiagnosis: string;
  aiAnalysis: {
    primary: string;
    confidence: number;
    differentials: Array<{ condition: string; probability: number }>;
  };
  expertCommentary?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

const mockCases: CaseData[] = [
  {
    id: 'CASE-001',
    image: 'https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2tpbiUyMGNvbmRpdGlvbiUyMGRlcm1hdG9sb2d5fGVufDF8fHx8MTc1OTg2ODIwN3ww&ixlib=rb-4.1.0&q=80&w=400',
    ageRange: '25-35 years',
    symptoms: 'Itchy, inflamed patches with scaling',
    duration: '3 months',
    region: 'West Africa',
    consensus: 'Atopic Dermatitis',
    confidence: 87,
    submissions: 23,
    correctDiagnosis: 'Atopic Dermatitis',
    difficulty: 'Medium',
    aiAnalysis: {
      primary: 'Atopic Dermatitis',
      confidence: 87,
      differentials: [
        { condition: 'Contact Dermatitis', probability: 12 },
        { condition: 'Seborrheic Dermatitis', probability: 8 },
        { condition: 'Psoriasis', probability: 5 }
      ]
    },
    expertCommentary: 'Classic presentation of atopic dermatitis with characteristic distribution pattern. Note the lichenification suggesting chronic nature.'
  },
  {
    id: 'CASE-002',
    image: 'https://images.unsplash.com/photo-1606501161752-e4be315c8b60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwZGVybWF0b2xvZ3klMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc1OTg2ODAwMHww&ixlib=rb-4.1.0&q=80&w=400',
    ageRange: '15-25 years',
    symptoms: 'White patches with clear borders',
    duration: '6 months',
    region: 'East Africa',
    consensus: 'Vitiligo',
    confidence: 94,
    submissions: 31,
    correctDiagnosis: 'Vitiligo',
    difficulty: 'Easy',
    aiAnalysis: {
      primary: 'Vitiligo',
      confidence: 94,
      differentials: [
        { condition: 'Post-inflammatory hypopigmentation', probability: 4 },
        { condition: 'Tinea versicolor', probability: 2 }
      ]
    },
    expertCommentary: 'Well-demarcated depigmented patches characteristic of vitiligo. Early intervention with topical therapies may help.'
  },
  {
    id: 'CASE-003',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwY29uZGl0aW9ufGVufDF8fHx8MTc1OTg2ODIwN3ww&ixlib=rb-4.1.0&q=80&w=400',
    ageRange: '35-45 years',
    symptoms: 'Scaly, silvery plaques',
    duration: '2 years',
    region: 'Southern Africa',
    consensus: 'Psoriasis',
    confidence: 78,
    submissions: 18,
    correctDiagnosis: 'Psoriasis',
    difficulty: 'Hard',
    aiAnalysis: {
      primary: 'Psoriasis',
      confidence: 78,
      differentials: [
        { condition: 'Seborrheic Dermatitis', probability: 15 },
        { condition: 'Eczema', probability: 7 }
      ]
    },
    expertCommentary: 'Chronic plaque psoriasis with typical silvery scaling. Consider systemic therapy given the extent and duration.'
  }
];

const userStats = {
  accuracy: 85,
  streak: 12,
  totalCases: 47,
  rank: 23,
  cmeCredits: 8.5,
  badges: ['Quick Learner', 'Consensus Master', 'Streak Champion']
};

export function PracticeFeed({ onNavigate }: PracticeFeedProps) {
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [userDiagnosis, setUserDiagnosis] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [submittedCases, setSubmittedCases] = useState<Set<string>>(new Set());

  const handleSubmitDiagnosis = (caseId: string) => {
    setSubmittedCases(prev => new Set([...prev, caseId]));
    setShowResults(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onNavigate('landing')}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <Home className="w-4 h-4 sm:hidden" />
              </Button>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-semibold text-foreground">Practice Feed</span>
                  <p className="text-xs text-muted-foreground">Educational Case Studies</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="sm" onClick={() => onNavigate('submission', 'provider')}>
                <Brain className="mr-2 w-4 h-4" />
                <span className="hidden sm:inline">Submit Case</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Stats & Leaderboard */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Accuracy</span>
                    <span className="font-medium">{userStats.accuracy}%</span>
                  </div>
                  <Progress value={userStats.accuracy} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary">{userStats.streak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-secondary">{userStats.totalCases}</div>
                    <div className="text-xs text-muted-foreground">Cases</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Rank #{userStats.rank}</span>
                  </div>
                  <Badge variant="secondary">{userStats.cmeCredits} CME</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {userStats.badges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{badge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="lg:hidden xl:block">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Dr. Amina K.', score: 94, rank: 1 },
                    { name: 'Dr. Kwame A.', score: 91, rank: 2 },
                    { name: 'Dr. Fatima M.', score: 89, rank: 3 },
                    { name: 'You', score: 85, rank: 23 }
                  ].map((user, index) => (
                    <div key={index} className={`flex items-center justify-between ${user.name === 'You' ? 'bg-primary/5 rounded px-2 py-1' : ''}`}>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">#{user.rank}</span>
                        <span className="text-sm">{user.name}</span>
                      </div>
                      <span className="text-sm font-medium">{user.score}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!selectedCase ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Practice Cases</h1>
                    <p className="text-muted-foreground">Sharpen your diagnostic skills with anonymized cases</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {mockCases.map((caseData) => (
                    <Card key={caseData.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedCase(caseData)}>
                      <CardContent className="p-0">
                        <div className="aspect-video relative overflow-hidden rounded-t-lg">
                          <ImageWithFallback
                            src={caseData.image}
                            alt={`Case ${caseData.id}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className={getDifficultyColor(caseData.difficulty)}>
                              {caseData.difficulty}
                            </Badge>
                          </div>
                          <div className="absolute top-3 right-3">
                            {submittedCases.has(caseData.id) && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-4 sm:p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold">{caseData.id}</h3>
                            <Badge variant="outline">{caseData.region}</Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground mb-4">
                            <p><span className="font-medium">Age:</span> {caseData.ageRange}</p>
                            <p><span className="font-medium">Duration:</span> {caseData.duration}</p>
                            <p><span className="font-medium">Symptoms:</span> {caseData.symptoms}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{caseData.submissions} submissions</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Target className="w-3 h-3" />
                                <span>{caseData.confidence}% consensus</span>
                              </div>
                            </div>
                            <Button size="sm">
                              Diagnose
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              /* Case Detail View */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={() => setSelectedCase(null)}>
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back to Cases
                  </Button>
                  <Button variant="ghost" onClick={() => setSelectedCase(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Case Image and Info */}
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-0">
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                          <ImageWithFallback
                            src={selectedCase.image}
                            alt={`Case ${selectedCase.id}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className={getDifficultyColor(selectedCase.difficulty)}>
                              {selectedCase.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Case Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div><Label>Case ID:</Label> <span className="font-mono">{selectedCase.id}</span></div>
                        <div><Label>Age Range:</Label> {selectedCase.ageRange}</div>
                        <div><Label>Duration:</Label> {selectedCase.duration}</div>
                        <div><Label>Region:</Label> {selectedCase.region}</div>
                        <div><Label>Symptoms:</Label> {selectedCase.symptoms}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Diagnosis Section */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Diagnosis</CardTitle>
                        <CardDescription>
                          Submit your diagnosis to see how it compares with the consensus
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="diagnosis">Primary Diagnosis</Label>
                          <Select value={userDiagnosis} onValueChange={setUserDiagnosis}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your diagnosis" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="atopic-dermatitis">Atopic Dermatitis</SelectItem>
                              <SelectItem value="vitiligo">Vitiligo</SelectItem>
                              <SelectItem value="psoriasis">Psoriasis</SelectItem>
                              <SelectItem value="contact-dermatitis">Contact Dermatitis</SelectItem>
                              <SelectItem value="seborrheic-dermatitis">Seborrheic Dermatitis</SelectItem>
                              <SelectItem value="eczema">Eczema</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button 
                          className="w-full" 
                          disabled={!userDiagnosis}
                          onClick={() => handleSubmitDiagnosis(selectedCase.id)}
                        >
                          Submit Diagnosis
                        </Button>
                      </CardContent>
                    </Card>

                    {(showResults || submittedCases.has(selectedCase.id)) && (
                      <>
                        <Card>
                          <CardHeader>
                            <CardTitle>Consensus Results</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span>Correct Answer:</span>
                              <Badge className="bg-green-100 text-green-800">
                                {selectedCase.correctDiagnosis}
                              </Badge>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Provider Consensus</span>
                                <span>{selectedCase.confidence}%</span>
                              </div>
                              <Progress value={selectedCase.confidence} className="h-2" />
                            </div>

                            <div className="text-sm text-muted-foreground">
                              <strong>{selectedCase.submissions}</strong> providers have diagnosed this case
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>AI Analysis</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Primary Diagnosis:</span>
                                <span>{selectedCase.aiAnalysis.primary}</span>
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>AI Confidence</span>
                                <span>{selectedCase.aiAnalysis.confidence}%</span>
                              </div>
                              <Progress value={selectedCase.aiAnalysis.confidence} className="h-2 mt-1" />
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Differential Diagnoses:</h4>
                              {selectedCase.aiAnalysis.differentials.map((diff, index) => (
                                <div key={index} className="flex justify-between text-sm mb-1">
                                  <span>{diff.condition}</span>
                                  <span>{diff.probability}%</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {selectedCase.expertCommentary && (
                          <Card>
                            <CardHeader>
                              <CardTitle>Expert Commentary</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-start space-x-3">
                                <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {selectedCase.expertCommentary}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}