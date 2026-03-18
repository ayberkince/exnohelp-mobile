export default function PrivacySettingsPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl font-black text-stone-900">Privacy & Data</h1>
        <p className="text-stone-500">Manage how your data is used and who can see it.</p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-stone-200">
          <div>
            <h3 className="font-bold text-stone-900">Public Profile</h3>
            <p className="text-sm text-stone-500">Control if your profile is visible in the search marketplace.</p>
          </div>
          <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
             <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="p-6 bg-stone-900 text-white rounded-2xl">
          <h3 className="font-bold mb-2">Request My Data</h3>
          <p className="text-sm text-stone-400 mb-4">Get a copy of all the data we have stored about your account.</p>
          <button className="text-xs font-black uppercase tracking-widest text-emerald-400">Download .JSON</button>
        </div>

        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl">
          <h3 className="font-bold text-red-900 mb-2">Delete Account</h3>
          <p className="text-sm text-red-700 mb-4">Permanently remove your account and data from the platform. This cannot be undone.</p>
          <button className="text-xs font-black uppercase tracking-widest text-red-600">Delete Permanently</button>
        </div>
      </section>
    </div>
  );
}
