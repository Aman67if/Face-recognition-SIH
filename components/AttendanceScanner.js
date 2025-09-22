import React, { useState, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Camera, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';


export function AttendanceScanner({ isEnabled = false, onScanComplete }) {
  const { user } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'success' | 'failed' | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScanning = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      setStream(mediaStream);
      setIsScanning(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      // Simulate face recognition after 3 seconds
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% success rate for demo
        setScanResult(success ? 'success' : 'failed');
        onScanComplete?.(success, success ? user?.id : undefined);
        
        // Auto-close after showing result
        setTimeout(() => {
          stopScanning();
        }, 2000);
      }, 3000);
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      setScanResult('failed');
    }
  }, [onScanComplete, user?.id]);

  const stopScanning = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
    setScanResult(null);
  }, [stream]);

  if (!isEnabled && user?.role === 'student') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Attendance Scanner</span>
          </CardTitle>
          <CardDescription>
            Scanner is currently disabled. Please wait for your teacher to enable it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            Scanner Disabled
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Attendance Scanner</span>
          </CardTitle>
          <CardDescription>
            {user?.role === 'student' 
              ? 'Scan your face to mark attendance' 
              : 'Students can use this to mark their attendance'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={startScanning}
            disabled={!isEnabled}
            className="w-full"
            variant={isEnabled ? "default" : "secondary"}
          >
            <Camera className="mr-2 h-4 w-4" />
            {isEnabled ? 'Start Scan' : 'Scanner Disabled'}
          </Button>
        </CardContent>
      </Card>

      {/* Scanner Modal */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Face Recognition Scanner</h3>
                <Button variant="ghost" size="sm" onClick={stopScanning}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  className="w-full aspect-video object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                
                {/* Scanning Overlay */}
                {!scanResult && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="border-2 border-primary rounded-full w-32 h-32"
                    />
                  </div>
                )}

                {/* Result Overlay */}
                {scanResult && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50"
                  >
                    {scanResult === 'success' ? (
                      <div className="text-center text-white">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-2" />
                        <p>Attendance Marked!</p>
                      </div>
                    ) : (
                      <div className="text-center text-white">
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-2" />
                        <p>Recognition Failed</p>
                        <p className="text-sm opacity-75">Please try again</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              <div className="text-center text-sm text-muted-foreground">
                {!scanResult ? 'Position your face in the circle...' : ''}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}