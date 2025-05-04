import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

type ScreeningStage = 'launcher' | 'progress' | 'results';

interface CandidateResult {
  id: string;
  name: string;
  matchScore: number;
  strengths: string[];
  skills: string[];
  developmentAreas: string[];
}

export function ResumeScreening() {
  const [stage, setStage] = useState<ScreeningStage>('launcher');
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [results, setResults] = useState<CandidateResult[]>([]);

  const startScreening = async () => {
    setStage('progress');
    setLog(['Initializing resume screening process...']);
    
    // Simulate progress updates
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(i);
      setLog(prev => [...prev, `Processing batch ${i/20 + 1} of 5...`]);
    }

    // Simulate results
    setResults([
      {
        id: '1',
        name: 'John Doe',
        matchScore: 92,
        strengths: ['Problem Solving', 'Team Leadership'],
        skills: ['React', 'TypeScript', 'Node.js'],
        developmentAreas: ['Cloud Architecture']
      },
      // Add more mock results as needed
    ]);

    setStage('results');
  };

  return (
    <Card className="p-6">
      {stage === 'launcher' && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">AI Resume Screening</h2>
          <p className="text-gray-600 mb-6">
            Click below to automatically screen candidate resumes against your job criteria
          </p>
          <Button onClick={startScreening}>Start Screening</Button>
        </div>
      )}

      {stage === 'progress' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Screening in Progress</h2>
          <Progress value={progress} className="w-full" />
          <ScrollArea className="h-[200px] border rounded-md p-4 bg-black/5">
            {log.map((entry, i) => (
              <div key={i} className="text-sm text-gray-600">
                {entry}
              </div>
            ))}
          </ScrollArea>
        </div>
      )}

      {stage === 'results' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Screening Results</h2>
          {results.map((candidate) => (
            <Card key={candidate.id} className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{candidate.name}</h3>
                <span className="text-green-600 font-semibold">
                  {candidate.matchScore}% Match
                </span>
              </div>
              
              <Tabs defaultValue="strengths" className="w-full">
                <TabsList>
                  <TabsTrigger value="strengths">Strengths</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="development">Development Areas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="strengths">
                  <ul className="list-disc pl-5">
                    {candidate.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="skills">
                  <ul className="list-disc pl-5">
                    {candidate.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="development">
                  <ul className="list-disc pl-5">
                    {candidate.developmentAreas.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}