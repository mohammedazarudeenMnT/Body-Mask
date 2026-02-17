"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Save,
  Send,
  Shield,
  Server,
  User,
  Key,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface EmailSettingsTabProps {
  onMessage?: (message: { type: "success" | "error"; text: string }) => void;
}

export function EmailSettingsTab({ onMessage }: EmailSettingsTabProps) {
  const [config, setConfig] = useState({
    smtpHost: "",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    senderEmail: "",
    secure: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testResult, setTestResult] = useState<"success" | "error" | null>(
    null,
  );

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await axiosInstance.get("/api/settings/email");
        setConfig({
          smtpHost: res.data.smtpHost || "",
          smtpPort: res.data.smtpPort || 587,
          smtpUsername: res.data.smtpUsername || "",
          smtpPassword: res.data.smtpPassword || "",
          senderEmail: res.data.senderEmail || "",
          secure: res.data.secure ?? true,
        });
      } catch (error) {
        console.error("Failed to fetch email config", error);
        if (onMessage) {
          onMessage({
            type: "error",
            text: "Failed to fetch email configuration",
          });
        }
      }
    }
    fetchConfig();
  }, [onMessage]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axiosInstance.post("/api/settings/email", config);
      const message = "Email configuration saved successfully!";
      toast.success(message);
      if (onMessage) {
        onMessage({ type: "success", text: message });
      }
    } catch (error) {
      console.error("Failed to save email config", error);
      const errorMessage = "Failed to save email configuration";
      toast.error(errorMessage);
      if (onMessage) {
        onMessage({ type: "error", text: errorMessage });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    if (!testEmail) {
      toast.error("Please enter a test email address");
      return;
    }
    setIsTesting(true);
    setTestResult(null);
    try {
      await axiosInstance.post("/api/settings/email/test", {
        testEmail,
        config,
      });
      const message = "Test email sent successfully!";
      toast.success(message);
      setTestResult("success");
      if (onMessage) {
        onMessage({ type: "success", text: message });
      }
    } catch (error: any) {
      console.error("Test email failed", error);
      const message =
        error.response?.data?.error || "Failed to send test email";
      toast.error(`Error: ${message}`);
      setTestResult("error");
      if (onMessage) {
        onMessage({ type: "error", text: `Error: ${message}` });
      }
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#c5a367]/10 via-[#c5a367]/5 to-transparent p-6 rounded-xl border border-[#c5a367]/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#c5a367]/10 rounded-lg shadow-sm">
            <Mail className="w-6 h-6 text-[#c5a367]" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              Email Configuration
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Configure SMTP settings to enable email notifications and
              automated communications. Set up your email provider for reliable
              message delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-5">
        <div className="flex gap-4">
          <div className="p-2.5 bg-[#c5a367]/10 rounded-lg flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-[#c5a367]" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-amber-900 mb-2">
              SMTP Configuration Guide
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Set up your SMTP server to enable email notifications and
              communications. For Gmail, use{" "}
              <code className="bg-white px-2 py-1 rounded border border-amber-200 text-amber-900">
                smtp.gmail.com
              </code>{" "}
              with port 587 or 465. For security, enable "Less secure app
              access" or use an App Password for accounts with 2FA enabled.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SMTP Server Settings */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-[#c5a367]/10 rounded-lg">
              <Server className="w-5 h-5 text-[#c5a367]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              SMTP Server Settings
            </h3>
          </div>

          <div className="space-y-5">
            <div className="grid md:grid-cols-3 gap-5">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  SMTP Host <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                  value={config.smtpHost}
                  onChange={(e) =>
                    setConfig({ ...config, smtpHost: e.target.value })
                  }
                  placeholder="smtp.gmail.com"
                />
                <p className="text-xs text-gray-500">
                  Your email provider's SMTP server address
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  SMTP Port <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="65535"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                  value={config.smtpPort}
                  onChange={(e) =>
                    setConfig({ ...config, smtpPort: parseInt(e.target.value) })
                  }
                />
                <p className="text-xs text-gray-500">Common: 587, 465, or 25</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="secure"
                  checked={config.secure}
                  onChange={(e) =>
                    setConfig({ ...config, secure: e.target.checked })
                  }
                  className="w-4 h-4 text-[#c5a367] rounded focus:ring-2 focus:ring-[#c5a367]/20"
                />
                <label
                  htmlFor="secure"
                  className="ml-2 text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-[#c5a367]" />
                  Use SSL/TLS Encryption
                </label>
              </div>
              <p className="text-xs text-gray-500 ml-auto">
                {config.secure
                  ? "Recommended for port 465"
                  : "Typically for port 587"}
              </p>
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-[#c5a367]/10 rounded-lg">
              <User className="w-5 h-5 text-[#c5a367]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Authentication Credentials
            </h3>
          </div>

          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  SMTP Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                  value={config.smtpUsername}
                  onChange={(e) =>
                    setConfig({ ...config, smtpUsername: e.target.value })
                  }
                  placeholder="your.email@gmail.com"
                  autoComplete="username"
                />
                <p className="text-xs text-gray-500">
                  Usually your full email address
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Key className="w-4 h-4" />
                  SMTP Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors font-mono"
                  value={config.smtpPassword}
                  onChange={(e) =>
                    setConfig({ ...config, smtpPassword: e.target.value })
                  }
                  placeholder="••••••••••••••••"
                  autoComplete="current-password"
                />
                <p className="text-xs text-gray-500">
                  Your email password or app-specific password
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                From Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                value={config.senderEmail}
                onChange={(e) =>
                  setConfig({ ...config, senderEmail: e.target.value })
                }
                placeholder="noreply@bodymask.com"
              />
              <p className="text-xs text-gray-500 flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>
                  This email address will appear as the sender in all outgoing
                  emails
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">
            Configuration will be encrypted and stored securely
          </p>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-[#c5a367] text-white rounded-lg hover:bg-[#c5a367]/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm transition-all transform hover:scale-105 active:scale-95"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving Configuration..." : "Save Configuration"}
          </button>
        </div>
      </form>

      {/* Test Email Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2.5 bg-[#c5a367]/10 rounded-lg">
            <Send className="w-5 h-5 text-[#c5a367]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Test Configuration
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Send a test email to verify your SMTP configuration is working
            correctly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Test Email Address
              </label>
              <input
                type="email"
                placeholder="test@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            <div className="sm:pt-7">
              <button
                onClick={handleTest}
                disabled={isTesting || !testEmail}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#c5a367] text-white rounded-lg hover:bg-[#c5a367]/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
              >
                <Send className="w-4 h-4" />
                {isTesting ? "Sending..." : "Send Test Email"}
              </button>
            </div>
          </div>

          {testResult && (
            <div
              className={`flex items-start gap-3 p-4 rounded-lg border ${
                testResult === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              {testResult === "success" ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-green-900">
                      Test Email Sent Successfully!
                    </h4>
                    <p className="text-xs text-green-700 mt-1">
                      Check the inbox of {testEmail} to confirm email delivery.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-900">
                      Failed to Send Test Email
                    </h4>
                    <p className="text-xs text-red-700 mt-1">
                      Please check your SMTP configuration and try again.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Common Providers Guide */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#c5a367]" />
          Common SMTP Providers
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-medium text-sm text-gray-900 mb-2">Gmail</h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>
                • Host:{" "}
                <code className="bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
                  smtp.gmail.com
                </code>
              </li>
              <li>• Port: 587 (TLS) or 465 (SSL)</li>
              <li>• Use App Password for 2FA accounts</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-medium text-sm text-gray-900 mb-2">
              Outlook/Office 365
            </h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>
                • Host:{" "}
                <code className="bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
                  smtp.office365.com
                </code>
              </li>
              <li>• Port: 587 (TLS)</li>
              <li>• Enable SMTP AUTH in settings</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-medium text-sm text-gray-900 mb-2">SendGrid</h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>
                • Host:{" "}
                <code className="bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
                  smtp.sendgrid.net
                </code>
              </li>
              <li>• Port: 587 or 465</li>
              <li>• Username: apikey</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-medium text-sm text-gray-900 mb-2">
              Amazon SES
            </h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Host: Region-specific endpoint</li>
              <li>• Port: 587, 465, or 25</li>
              <li>• Use SMTP credentials from IAM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
