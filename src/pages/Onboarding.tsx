import React, { useState } from "react";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { Button } from "@/components/ui/button";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import { AILoading } from "@/components/komisi/AILoading";
import { OnboardingStepBar } from "@/components/komisi/OnboardingStepBar";
import { BadgeStatus, StatusDot } from "@/components/komisi/BadgeStatus";
import { Sparkles, ArrowRight, Copy, Eye, EyeOff, Plus, X, Link as LinkIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const stepLabels = ["Setup Your App", "Connect Revenue", "Set Commission", "Install SDK", "Invite Affiliate"];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [platform, setPlatform] = useState("both");
  const [commType, setCommType] = useState("revenue");
  const [sdkPlatform, setSdkPlatform] = useState("ios");
  const [showKey, setShowKey] = useState(false);
  const [emails, setEmails] = useState(["creator@tiktok.com", "reviewer@youtube.com"]);
  const [emailInput, setEmailInput] = useState("");
  const [connected, setConnected] = useState<string[]>([]);
  const [celebration, setCelebration] = useState(false);
  const navigate = useNavigate();

  const handleFetch = () => {
    setFetching(true);
    setTimeout(() => { setFetching(false); setFetched(true); }, 7500);
  };

  const handleFinish = () => {
    setCelebration(true);
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const next = () => { if (step < 4) setStep(step + 1); else handleFinish(); };
  const back = () => { if (step > 0) setStep(step - 1); };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top */}
      <div className="px-6 py-4 flex items-center gap-6">
        <KomisiLogo size="sm" />
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={cn("h-[3px] w-10 rounded-full transition-all", i <= step ? "bg-foreground" : "bg-border")} />
          ))}
        </div>
      </div>

      {/* Decorative watercolor */}
      <div className="absolute top-0 left-0 w-48 h-48 watercolor-mixed opacity-30 rounded-br-full pointer-events-none" />

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 pt-8 pb-24">
        <div className="w-full max-w-2xl animate-slide-left" key={step}>
          {/* STEP 1 */}
          {step === 0 && (
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-foreground">Setup Your App</h1>
              <p className="text-base text-text-secondary mt-2">Add your app so Komisi can configure tracking and attribution.</p>

              <div className="mt-8 border border-border rounded-xl p-6 bg-card">
                {!fetching && !fetched && (
                  <>
                    <div className="flex items-center gap-2 text-foreground font-semibold"><Sparkles size={16} className="text-chart-purple" /> Fetch with Komisi AI</div>
                    <p className="text-sm text-text-secondary mt-1">Let us do the heavy lifting...</p>
                    <input placeholder="Paste your App Store or Play Store URL" className="w-full h-10 px-3 mt-4 text-sm bg-background border border-border rounded-lg placeholder:text-text-tertiary focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all" />
                    <Button variant="ai" className="w-full h-11 mt-4" onClick={handleFetch}><Sparkles size={14} /> Fetch App Data</Button>
                  </>
                )}
                {fetching && (
                  <AILoading steps={[
                    { label: "Finding your app on the store" },
                    { label: "Pulling app details and metadata" },
                    { label: "Analyzing app category and keywords" },
                    { label: "Generating description" },
                    { label: "Almost there!" },
                  ]} />
                )}
                {fetched && <p className="text-sm text-success font-medium">✓ App data fetched successfully</p>}
              </div>

              {fetched && (
                <div className="mt-6 space-y-4">
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">App Name *</label><input defaultValue="MindfulApp" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all" /></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Platform *</label>
                    <ChipSelector options={[{label:"iOS",value:"ios"},{label:"Android",value:"android"},{label:"Both",value:"both"}]} value={platform} onChange={setPlatform} />
                  </div>
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">App Category *</label>
                    <select className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg focus:border-foreground outline-none"><option>Health & Fitness</option><option>Productivity</option></select>
                  </div>
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Brief Description</label>
                    <textarea defaultValue="Guided meditation and mindfulness exercises for daily well-being." className="w-full min-h-[80px] px-3 py-2 text-sm bg-card border border-border rounded-lg focus:border-foreground outline-none resize-y" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-foreground">Connect Your Revenue Platform</h1>
              <p className="text-base text-text-secondary mt-2">Choose how you track in-app purchases.</p>
              <div className="mt-8 space-y-4">
                {[
                  { name: "RevenueCat", desc: "Most popular. Works with iOS, Android, and web.", recommended: true },
                  { name: "Adapty", desc: "Alternative subscription platform.", recommended: false },
                ].map((p) => (
                  <div key={p.name} className="border border-border rounded-xl p-5 bg-card flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-background-subtle border border-border shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{p.name}</span>
                        {p.recommended && <BadgeStatus variant="success">Recommended</BadgeStatus>}
                      </div>
                      <p className="text-sm text-text-secondary">{p.desc}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <StatusDot status={connected.includes(p.name) ? "active" : "error"} />
                        <span className={cn("text-xs", connected.includes(p.name) ? "text-success" : "text-error")}>
                          {connected.includes(p.name) ? "Connected" : "Not Connected"}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant={connected.includes(p.name) ? "ghost" : p.recommended ? "default" : "secondary"}
                      size="sm"
                      disabled={connected.includes(p.name)}
                      onClick={() => setConnected([...connected, p.name])}
                    >
                      {connected.includes(p.name) ? "✓ Connected" : `Connect ${p.name}`}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-background-subtle rounded-lg p-4 text-sm text-text-secondary">💡 Not sure? RevenueCat works with 90% of subscription apps. You can add Adapty later.</div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-foreground">Set Your Commission Structure</h1>
              <p className="text-base text-text-secondary mt-2">Define how affiliates earn from your app.</p>

              <div className="mt-8 gradient-ai-subtle rounded-xl p-5 border border-chart-purple/20">
                <div className="flex items-center gap-2 font-semibold text-foreground"><Sparkles size={16} className="text-chart-purple" /> AI Recommendation</div>
                <p className="text-sm text-text-secondary mt-2">Based on your category (Health & Fitness), top-performing apps offer:</p>
                <p className="text-base font-semibold text-foreground mt-2">30% revenue share on first purchase</p>
                <p className="text-base font-semibold text-foreground">20% on renewals for 12 months</p>
                <Button variant="secondary" size="sm" className="mt-3">Apply Recommendation</Button>
              </div>

              <div className="mt-6 space-y-4">
                <div><label className="block text-sm font-medium text-foreground mb-2">Commission Type *</label>
                  <ChipSelector options={[{label:"Revenue Share (%)",value:"revenue"},{label:"Fixed Amount ($)",value:"fixed"}]} value={commType} onChange={setCommType} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">First Purchase *</label><input defaultValue="30" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Recurring</label><input defaultValue="20" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Duration</label><select className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none"><option>12 months</option><option>6 months</option><option>Lifetime</option></select></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Attribution Window</label><select className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none"><option>30 days</option><option>14 days</option><option>7 days</option></select></div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 3 && (
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-foreground">Install the Komisi SDK</h1>
              <p className="text-base text-text-secondary mt-2">One lightweight SDK. Five minutes. Full attribution.</p>

              <div className="mt-6"><ChipSelector options={[{label:"Swift",value:"ios"},{label:"Kotlin",value:"android"},{label:"Flutter",value:"flutter"},{label:"React Native",value:"rn"}]} value={sdkPlatform} onChange={setSdkPlatform} /></div>

              <div className="mt-4 rounded-xl bg-primary text-primary-foreground p-6 font-mono text-[13px] leading-relaxed overflow-x-auto">
                {sdkPlatform === "ios" && (<>
                  <div className="text-text-tertiary mb-2">// 1. Add the package</div>
                  <div className="text-chart-blue">.package(url: "https://github.com/komisi/sdk-ios", from: "1.0.0")</div>
                  <div className="text-text-tertiary mt-4 mb-2">// 2. Initialize in AppDelegate</div>
                  <div><span className="text-chart-purple">import</span> KomisiSDK</div>
                  <div><span className="text-chart-purple">Komisi</span>.configure(apiKey: <span className="text-chart-amber">"YOUR_API_KEY"</span>)</div>
                  <div className="text-text-tertiary mt-4 mb-2">// 3. Set subscriber attribute for RevenueCat</div>
                  <div><span className="text-chart-purple">Purchases</span>.shared.attribution.setAttributes([<span className="text-chart-amber">"komisi_ref"</span>: refCode])</div>
                </>)}
                {sdkPlatform === "android" && (<>
                  <div className="text-text-tertiary mb-2">// 1. Add dependency</div>
                  <div className="text-chart-blue">implementation "io.komisi:sdk-android:1.0.0"</div>
                  <div className="text-text-tertiary mt-4 mb-2">// 2. Initialize in Application</div>
                  <div><span className="text-chart-purple">KomisiSDK</span>.configure(this, apiKey = <span className="text-chart-amber">"YOUR_API_KEY"</span>)</div>
                  <div className="text-text-tertiary mt-4 mb-2">// 3. Handle Install Referrer (automatic with SDK)</div>
                  <div className="text-text-tertiary">// Attribution via Play Install Referrer API — no code needed</div>
                </>)}
                {sdkPlatform === "flutter" && (<>
                  <div className="text-text-tertiary mb-2">// 1. Add to pubspec.yaml</div>
                  <div className="text-chart-blue">dependencies:</div>
                  <div className="text-chart-blue">  komisi_sdk: ^1.0.0</div>
                  <div className="text-text-tertiary mt-4 mb-2">// 2. Initialize</div>
                  <div><span className="text-chart-purple">await</span> KomisiSDK.configure(apiKey: <span className="text-chart-amber">'YOUR_API_KEY'</span>);</div>
                  <div className="text-text-tertiary mt-4 mb-2">// 3. Set subscriber attribute</div>
                  <div><span className="text-chart-purple">Purchases</span>.setAttributes({'{'}  <span className="text-chart-amber">'komisi_ref'</span>: refCode {'}'});</div>
                </>)}
                {sdkPlatform === "rn" && (<>
                  <div className="text-text-tertiary mb-2">// 1. Install</div>
                  <div className="text-chart-blue">npm install @komisi/react-native-sdk</div>
                  <div className="text-text-tertiary mt-4 mb-2">// 2. Initialize</div>
                  <div><span className="text-chart-purple">import</span> Komisi <span className="text-chart-purple">from</span> <span className="text-chart-amber">'@komisi/react-native-sdk'</span>;</div>
                  <div><span className="text-chart-purple">Komisi</span>.configure({'{'} apiKey: <span className="text-chart-amber">'YOUR_API_KEY'</span> {'}'});</div>
                  <div className="text-text-tertiary mt-4 mb-2">// 3. Set subscriber attribute</div>
                  <div><span className="text-chart-purple">Purchases</span>.setAttributes({'{'} <span className="text-chart-amber">komisi_ref</span>: refCode {'}'});</div>
                </>)}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-foreground mb-1.5">Your API Key</label>
                <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 h-10">
                  <span className="flex-1 font-mono text-sm text-foreground truncate">{showKey ? "km_live_a1b2c3d4e5f6g7h8" : "km_live_••••••••••••••"}</span>
                  <button onClick={() => setShowKey(!showKey)} className="text-text-tertiary hover:text-foreground"><Eye size={16} /></button>
                  <button className="text-text-tertiary hover:text-foreground"><Copy size={16} /></button>
                </div>
              </div>
              <a href="#" className="inline-block mt-3 text-sm text-text-secondary underline hover:text-foreground">View full documentation →</a>
            </div>
          )}

          {/* STEP 5 */}
          {step === 4 && (
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-foreground">You're Almost Live! 🎉</h1>
              <p className="text-base text-text-secondary mt-2">Invite your first affiliate or share your program link.</p>

              <div className="mt-8 space-y-6">
                {/* Email invite */}
                <div className="border border-border rounded-xl p-5 bg-card">
                  <h3 className="font-semibold text-foreground mb-3">Invite by Email</h3>
                  <div className="flex gap-2">
                    <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="affiliate@example.com" className="flex-1 h-10 px-3 text-sm bg-background border border-border rounded-lg outline-none focus:border-foreground" />
                    <Button variant="secondary" size="sm" onClick={() => { if (emailInput) { setEmails([...emails, emailInput]); setEmailInput(""); } }}><Plus size={14} /> Add</Button>
                  </div>
                  {emails.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {emails.map((e) => (
                        <span key={e} className="inline-flex items-center gap-1 bg-background-subtle rounded-full px-3 py-1 text-sm">
                          {e} <button onClick={() => setEmails(emails.filter((x) => x !== e))} className="text-text-tertiary hover:text-foreground"><X size={12} /></button>
                        </span>
                      ))}
                    </div>
                  )}
                  <Button className="mt-3">Send Invitations <ArrowRight size={14} /></Button>
                </div>

                <div className="flex items-center gap-4"><div className="flex-1 h-px bg-border" /><span className="text-xs text-text-tertiary">OR</span><div className="flex-1 h-px bg-border" /></div>

                {/* Share link */}
                <div className="border border-border rounded-xl p-5 bg-card">
                  <h3 className="font-semibold text-foreground mb-2">Share Your Program Link</h3>
                  <div className="flex items-center gap-2 bg-background-subtle rounded-lg px-3 h-10">
                    <LinkIcon size={14} className="text-text-tertiary" />
                    <span className="flex-1 font-mono text-sm text-foreground truncate">https://komisi.io/join/mindfulapp</span>
                    <button className="text-text-tertiary hover:text-foreground"><Copy size={16} /></button>
                  </div>
                  <p className="text-xs text-text-tertiary mt-2">Anyone with this link can apply. You approve each application.</p>
                </div>

                <div className="flex items-center gap-4"><div className="flex-1 h-px bg-border" /><span className="text-xs text-text-tertiary">OR</span><div className="flex-1 h-px bg-border" /></div>

                <Button variant="secondary" className="w-full">Browse the Creator Marketplace <ArrowRight size={14} /></Button>
                <button className="w-full text-center text-sm text-text-secondary hover:text-foreground">Skip — I'll do this later</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Celebration */}
      {celebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-center animate-confetti">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-foreground">You're all set!</h2>
            <p className="text-text-secondary mt-1">Redirecting to your dashboard...</p>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0">
        <OnboardingStepBar
          totalSteps={5}
          currentStep={step}
          stepLabel={stepLabels[step]}
          onBack={back}
          onNext={next}
          onSkipStep={next}
          onSkipAll={() => navigate("/dashboard")}
          isLast={step === 4}
        />
      </div>
    </div>
  );
};

export default Onboarding;
