import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { initializeTestAccounts, getTestCredentials, TEST_ACCOUNTS } from "@/lib/test-accounts";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TestAccountsPage() {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const credentials = getTestCredentials();

  const handleInitialize = () => {
    initializeTestAccounts();
    toast({
      title: "Test accounts initialized!",
      description: "All test accounts have been added to the system.",
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied!",
      description: "Credential copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold">Test Accounts</h1>
            <p className="text-muted-foreground mt-2">
              Demo accounts for testing PeaceLink functionality
            </p>
          </div>
          <Button onClick={handleInitialize} size="lg" className="shadow-lg">
            Initialize Test Accounts
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Youth Accounts */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-heading font-bold text-blue-600">Youth Accounts</h2>
            <div className="space-y-3">
              {credentials.youth.map((account) => (
                <div key={account.phone} className="p-3 bg-blue-50 rounded-lg space-y-1">
                  <p className="font-semibold">{account.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-mono text-muted-foreground">{account.phone}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(account.phone, account.phone)}
                    >
                      {copiedId === account.phone ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Login: Phone + OTP</p>
          </Card>

          {/* Elder Accounts */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-heading font-bold text-amber-600">Elder Accounts</h2>
            <div className="space-y-3">
              {credentials.elder.map((account) => (
                <div key={account.phone} className="p-3 bg-amber-50 rounded-lg space-y-1">
                  <p className="font-semibold">{account.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-mono text-muted-foreground">{account.phone}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(account.phone, account.phone)}
                    >
                      {copiedId === account.phone ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Login: Phone + OTP</p>
          </Card>

          {/* NGO/Partner Accounts */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-heading font-bold text-slate-600">NGO/Partner Accounts</h2>
            <div className="space-y-3">
              {credentials.ngo.map((account) => (
                <div key={account.email} className="p-3 bg-slate-50 rounded-lg space-y-1">
                  <p className="font-semibold">{account.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-mono text-muted-foreground break-all">{account.email}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(account.email!, account.email!)}
                    >
                      {copiedId === account.email ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Login: Email + Password (any)</p>
          </Card>

          {/* Moderator Accounts */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-heading font-bold text-emerald-600">Moderator Accounts</h2>
            <div className="space-y-3">
              {credentials.moderator.map((account) => (
                <div key={account.email} className="p-3 bg-emerald-50 rounded-lg space-y-1">
                  <p className="font-semibold">{account.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-mono text-muted-foreground break-all">{account.email}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(account.email!, account.email!)}
                    >
                      {copiedId === account.email ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Login: Email + Password (any)</p>
          </Card>

          {/* Admin Accounts */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-heading font-bold text-emerald-700">Admin Accounts</h2>
            <div className="space-y-3">
              {credentials.admin.map((account) => (
                <div key={account.email} className="p-3 bg-emerald-100 rounded-lg space-y-1">
                  <p className="font-semibold">{account.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-mono text-muted-foreground break-all">{account.email}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(account.email!, account.email!)}
                    >
                      {copiedId === account.email ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Login: Email + Password (any)</p>
          </Card>
        </div>

        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-heading font-bold text-lg mb-3">Quick Start Instructions</h3>
          <ol className="space-y-2 text-sm">
            <li>1. Click "Initialize Test Accounts" button above to load all accounts</li>
            <li>2. Go to the Login page and select appropriate tab (Phone or Email)</li>
            <li>3. For Youth/Elder: Enter phone number → Get OTP (shown in demo mode)</li>
            <li>4. For NGO/Admin/Moderator: Enter email + any password (demo accepts all)</li>
            <li>5. You'll be redirected to the role-specific dashboard</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}
