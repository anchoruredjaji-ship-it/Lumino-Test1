import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Switch } from './components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Textarea } from './components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Badge } from './components/ui/badge';
import { Plus, Trash2, Package, ArrowLeft, Edit, FileText, Eye, Upload, X, Image, MessageSquare } from 'lucide-react';
import PdfPreview from './components/PdfPreview';
import LuminoBrandIntro from './components/LuminoBrandIntro';

// Types
interface Stavka {
  id: string;
  tip: string;
  kolicina: string;
}

interface KrovSlika {
  id: string;
  file: File;
  url: string;
  naziv: string;
}

interface Krov {
  id: string;
  brojModula: string;
  orijentacija: string;
  procenatNagiba: string;
  slike: KrovSlika[];
}

interface UsloviPlacanja {
  prvi: string;
  drugi: string;
  treci: string;
}

interface Artikal {
  id: string;
  naziv: string;
  opis: string;
  garancija: string;
  tip: string;
  jedinicaMere?: string;
  kolicina?: number;
  slika?: string;
}

export default function App() {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'form' | 'artikli' | 'roi-analysis' | 'chart-generator' | 'final-proposal' | 'system-specification'>('intro');
  
  // State management
  const [tipKupca, setTipKupca] = useState('pravno');
  const [stavke, setStavke] = useState<Stavka[]>([
    { id: '1', tip: 'solarni-moduli', kolicina: '' },
    { id: '2', tip: 'inverter', kolicina: '' },
    { id: '3', tip: 'baterija', kolicina: '' },
    { id: '4', tip: 'ugradnja', kolicina: 'Da' },
    { id: '5', tip: 'eps', kolicina: 'Da' }
  ]);
  const [krovovi, setKrovovi] = useState<Krov[]>([
    { id: '1', brojModula: '', orijentacija: '', procenatNagiba: '', slike: [] },
    { id: '2', brojModula: '', orijentacija: '', procenatNagiba: '', slike: [] }
  ]);
  const [napomena, setNapomena] = useState(false);

  // Reset napomena when switching to fizicko lice
  const handleTipKupcaChange = (value: string) => {
    setTipKupca(value);
    if (value === 'fizicko') {
      setNapomena(false);
      // Reset PDV calculations if needed
      if (formData.cenaBezPDV && !formData.cenaSaPDV) {
        updateFormData('cenaBezPDV', formData.cenaBezPDV);
      }
    }
  };

  // Handle ��lan 10 changes
  const handleNapomenaChange = (checked: boolean) => {
    setNapomena(checked);
    if (checked && tipKupca === 'pravno') {
      // Clear PDV fields when Član 10 is activated
      setFormData(prev => ({
        ...prev,
        pdvIznos: '',
        cenaSaPDV: ''
      }));
    } else if (!checked && tipKupca === 'pravno' && formData.cenaBezPDV) {
      // Recalculate PDV when Član 10 is deactivated
      updateFormData('cenaBezPDV', formData.cenaBezPDV);
    }
  };
  const [usloviPlacanja, setUsloviPlacanja] = useState<UsloviPlacanja>({
    prvi: '',
    drugi: '',
    treci: ''
  });

  // Artikli state
  const [artikli, setArtikli] = useState<Artikal[]>([
    { 
      id: '1', 
      naziv: 'Solarni Panel Mono 580 W - Leapton LP182*182M 72NB N -tip', 
      opis: 'Visok stepen efikasnosti zbog korišćenja N-tip monokristalnih ćelija\n• Visoka otpornost vrode agresivni vremenske uslovi\n• Visoka dugotrajnost, standardni način života\n• Dugotrajnost performanse kod uz održene životni ciklus\n• Nizom za temperaturni koeficijent koji omogućava 25 godina pa čini da so\nje manje podložan tome\n• 30 godina garancije na fizičku ispravnost\n• 30 godina garancije na bloku snagu od 87.4% u odnosu na nominalnu.',
      garancija: '30 godina',
      tip: 'solarni-moduli',
      jedinicaMere: 'kom.',
      kolicina: 88,
      slika: 'https://images.unsplash.com/photo-1626793369994-a904d2462888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwbW9ub2NyeXN0YWxsaW5lfGVufDF8fHx8MTc1NzQ5MDQ3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: '2', 
      naziv: 'Krovnu konstrukcija', 
      opis: 'Profil za montažu PV modula\n• Čelično žrvanja i renderi set čineove Zn\n• Vije od aluminijumske montaže profila\n• 12 godina garancije na fizičke karakteristike.',
      garancija: '12 godina',
      tip: 'inverter',
      jedinicaMere: 'set',
      kolicina: 88,
      slika: 'https://images.unsplash.com/photo-1741446458387-74132b7d49cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwbW91bnRpbmclMjBzeXN0ZW0lMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzU3NDkwNDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: '3', 
      naziv: 'Huawei SUN2000- 50 KTL Inverter', 
      opis: 'Inverter - 50kW\n• Tip: Trofazni inverter\n• Komunikacioni mogućnosti: Ethernet/WLAN\n• Masa: 40 kg\n• Garancija: 10 godina',
      garancija: '10 godina',
      tip: 'baterija',
      jedinicaMere: 'kom.',
      kolicina: 1,
      slika: 'https://images.unsplash.com/photo-1662601311311-c4422d17abf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGludmVydGVyJTIwaHVhd2VpfGVufDF8fHx8MTc1NzQ5MDQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: '4', 
      naziv: 'Projektovanje sistema', 
      opis: 'Projektovanje\n• Statičko na terenu prihvata odbacivanja i podašća sistem u rad\n• Dokla kontrole za koncipuje SW i rad ovladavanje',
      garancija: '',
      tip: 'ugradnja',
      jedinicaMere: 'Set',
      kolicina: 1
    },
    { 
      id: '5', 
      naziv: 'AC i DC Razvodne ormar', 
      opis: 'Elektroni ormarić Schneider electric / Eaton\n• Oslem za zaštitnu funkcionalnost\n• Oslem za preklapanje',
      garancija: '',
      tip: 'eps',
      jedinicaMere: 'set',
      kolicina: 1,
      slika: 'https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwY2FiaW5ldCUyMG1vdW50aW5nfGVufDF8fHx8MTc1NzQ5MDQ4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: '6', 
      naziv: 'Ugradnja sistema sa svim propratnim elementima i peštanje u rad', 
      opis: 'DC kahlovi 6 mm za pojavljanjuje web sloop-ova\n• Pojašnjen AC kahlovi 5x6mm\n• Proprietarni stlačni elementi\n• Ugradnja sistema snage 50 kW\n• Modana rabe na lokaciji ugradnje',
      garancija: '',
      tip: 'ugradnja',
      jedinicaMere: 'set',
      kolicina: 1
    }
  ]);

  const [showArtikalDialog, setShowArtikalDialog] = useState(false);
  const [editingArtikal, setEditingArtikal] = useState<Artikal | null>(null);
  const [artikalForm, setArtikalForm] = useState({
    naziv: '',
    opis: '',
    garancija: '',
    tip: 'solarni-moduli',
    jedinicaMere: 'kom.',
    kolicina: 1
  });

  // GEFF state
  const [geffUkljucen, setGeffUkljucen] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    nazivProjekta: '',
    snagaSistema: '138',
    datum: '',
    objekatLokacija: '',
    nazivKupca: '',
    adresaKupca: '',
    pib: '',
    mb: '',
    telefon: '',
    email: '',
    cenaBezPDV: '',
    pdvIznos: '',
    cenaSaPDV: '',
    procenatSubvencije: '',
    cenaSaSubvencijom: '',
    cenaKwh: '',
    godisnjaProizvodnja: '',
    godisnjaUsteda: '',
    povratInvesticije: '',
    mesecnaProizvodnja: '',
    degradacijaNakon30: '20'
  });

  // System efficiency state
  const [tipSistema, setTipSistema] = useState('standard');
  const [customIskoriscenost, setCustomIskoriscenost] = useState('100');

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-calculate PDV when cenaBezPDV changes (only if Član 10 is not active)
      if (field === 'cenaBezPDV') {
        const cenaBezPDV = parseFloat(value) || 0;
        if (cenaBezPDV > 0 && !(napomena && tipKupca === 'pravno')) {
          const pdvIznos = cenaBezPDV * 0.2; // 20% PDV
          const cenaSaPDV = cenaBezPDV + pdvIznos;
          newData.pdvIznos = pdvIznos.toFixed(2);
          newData.cenaSaPDV = cenaSaPDV.toFixed(2);
        } else if (cenaBezPDV === 0) {
          newData.pdvIznos = '';
          newData.cenaSaPDV = '';
        }
      }
      
      // Auto-calculate cena bez PDV when cenaSaPDV changes (only if Član 10 is not active)
      if (field === 'cenaSaPDV' && !(napomena && tipKupca === 'pravno')) {
        const cenaSaPDV = parseFloat(value) || 0;
        if (cenaSaPDV > 0) {
          const cenaBezPDV = cenaSaPDV / 1.2; // Remove 20% PDV
          const pdvIznos = cenaSaPDV - cenaBezPDV;
          newData.cenaBezPDV = cenaBezPDV.toFixed(2);
          newData.pdvIznos = pdvIznos.toFixed(2);
        } else {
          newData.cenaBezPDV = '';
          newData.pdvIznos = '';
        }
      }
      
      // Auto-calculate cena sa subvencijom when cenaSaPDV, cenaBezPDV or procenatSubvencije changes
      if (field === 'cenaSaPDV' || field === 'cenaBezPDV' || field === 'procenatSubvencije') {
        const procenatSubvencije = parseFloat(field === 'procenatSubvencije' ? value : prev.procenatSubvencije) || 0;
        
        // Use appropriate base price depending on Član 10 status
        let baseCena = 0;
        if (napomena && tipKupca === 'pravno') {
          // Use cenaBezPDV when Član 10 is active
          baseCena = parseFloat(field === 'cenaBezPDV' ? value : newData.cenaBezPDV) || 0;
        } else {
          // Use cenaSaPDV when normal taxation
          baseCena = parseFloat(field === 'cenaSaPDV' ? value : newData.cenaSaPDV) || 0;
        }
        
        if (baseCena > 0 && procenatSubvencije > 0) {
          const cenaSaSubvencijom = baseCena * (1 - procenatSubvencije / 100);
          newData.cenaSaSubvencijom = cenaSaSubvencijom.toFixed(2);
        } else if (baseCena > 0 && procenatSubvencije === 0) {
          newData.cenaSaSubvencijom = baseCena.toString();
        }
      }
      
      return newData;
    });
  };

  const dodajStavku = () => {
    const newId = Date.now().toString();
    setStavke([...stavke, { id: newId, tip: 'solarni-moduli', kolicina: '' }]);
  };

  const ukloniStavku = (id: string) => {
    setStavke(stavke.filter(stavka => stavka.id !== id));
  };

  const updateStavka = (id: string, field: 'tip' | 'kolicina', value: string) => {
    setStavke(stavke.map(stavka => 
      stavka.id === id ? { ...stavka, [field]: value } : stavka
    ));
  };

  const dodajKrov = () => {
    const newId = (krovovi.length + 1).toString();
    setKrovovi([...krovovi, { id: newId, brojModula: '', orijentacija: '', procenatNagiba: '', slike: [] }]);
  };

  const ukloniKrov = (id: string) => {
    if (krovovi.length > 1) {
      setKrovovi(krovovi.filter(krov => krov.id !== id));
    }
  };

  const updateKrov = (id: string, field: 'brojModula' | 'orijentacija' | 'procenatNagiba', value: string) => {
    setKrovovi(krovovi.map(krov => 
      krov.id === id ? { ...krov, [field]: value } : krov
    ));
  };

  // Image handling functions
  const dodajSlikuKrovu = (krovId: string, files: FileList | null) => {
    if (!files) return;
    
    const newSlike: KrovSlika[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      naziv: file.name
    }));

    setKrovovi(krovovi.map(krov => 
      krov.id === krovId 
        ? { ...krov, slike: [...krov.slike, ...newSlike] }
        : krov
    ));
  };

  const ukloniSlikuSaKrova = (krovId: string, slikaId: string) => {
    setKrovovi(krovovi.map(krov => {
      if (krov.id === krovId) {
        const slika = krov.slike.find(s => s.id === slikaId);
        if (slika) {
          URL.revokeObjectURL(slika.url); // Clean up the object URL
        }
        return {
          ...krov,
          slike: krov.slike.filter(s => s.id !== slikaId)
        };
      }
      return krov;
    }));
  };

  const getTipStavkeLabel = (tip: string) => {
    const labels: Record<string, string> = {
      'solarni-moduli': 'Solarni moduli',
      'inverter': 'Inverter',
      'baterija': 'Baterija',
      'ugradnja': 'Ugradnja',
      'eps': 'Priključak na EPS'
    };
    return labels[tip] || tip;
  };

  // Artikli functions
  const dodajArtikal = () => {
    if (editingArtikal) {
      setArtikli(artikli.map(a => 
        a.id === editingArtikal.id 
          ? { ...editingArtikal, ...artikalForm }
          : a
      ));
      setEditingArtikal(null);
    } else {
      const newArtikal: Artikal = {
        id: (artikli.length + 1).toString(),
        ...artikalForm
      };
      setArtikli([...artikli, newArtikal]);
    }
    setArtikalForm({ naziv: '', opis: '', garancija: '', tip: 'solarni-moduli', jedinicaMere: 'kom.', kolicina: 1 });
    setShowArtikalDialog(false);
  };

  const editArtikal = (artikal: Artikal) => {
    setEditingArtikal(artikal);
    setArtikalForm({
      naziv: artikal.naziv,
      opis: artikal.opis,
      garancija: artikal.garancija,
      tip: artikal.tip,
      jedinicaMere: artikal.jedinicaMere || 'kom.',
      kolicina: artikal.kolicina || 1
    });
    setShowArtikalDialog(true);
  };

  const ukloniArtikal = (id: string) => {
    setArtikli(artikli.filter(a => a.id !== id));
  };

  const getArtikliByTip = (tip: string) => {
    return artikli.filter(a => a.tip === tip);
  };







  // Render Brand Intro screen
  if (currentScreen === 'intro') {
    return <LuminoBrandIntro onComplete={() => setCurrentScreen('form')} />;
  }

  // Render ROI Analysis screen
  if (currentScreen === 'roi-analysis') {
    const ROIAnalysisScreen = React.lazy(() => import('./components/ROIAnalysisScreen'));
    
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-xl">Učitavanje ROI analize...</div></div>}>
        <ROIAnalysisScreen onBack={() => setCurrentScreen('form')} formData={formData} />
      </React.Suspense>
    );
  }

  // Render Solar Dashboard screen
  if (currentScreen === 'chart-generator') {
    const SolarDashboard = React.lazy(() => import('./components/SolarDashboard'));
    
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-xl">Učitavanje analize proizvodnje...</div></div>}>
        <SolarDashboard onBack={() => setCurrentScreen('form')} formData={formData} />
      </React.Suspense>
    );
  }

  // Render Final Proposal screen
  if (currentScreen === 'final-proposal') {
    const FinalProposalScreen = React.lazy(() => import('./components/FinalProposalScreen'));
    
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-xl">Učitavanje konačne ponude...</div></div>}>
        <FinalProposalScreen 
          onBack={() => setCurrentScreen('form')} 
          formData={{ ...formData, tipSistema, customIskoriscenost }}
          stavke={stavke}
          artikli={artikli}
          tipKupca={tipKupca}
          napomena={napomena}
        />
      </React.Suspense>
    );
  }

  // Render System Specification screen
  if (currentScreen === 'system-specification') {
    const SystemSpecificationScreen = React.lazy(() => import('./components/SystemSpecificationScreen'));
    
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-xl">Učitavanje specifikacije sistema...</div></div>}>
        <SystemSpecificationScreen 
          onBack={() => setCurrentScreen('form')} 
          formData={formData}
          stavke={stavke}
          artikli={artikli}
          tipKupca={tipKupca}
          napomena={napomena}
        />
      </React.Suspense>
    );
  }

  // Render Artikli screen
  if (currentScreen === 'artikli') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <div className="h-8 w-32 flex items-center justify-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] bg-clip-text text-transparent">
                    LuminOne
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentScreen('form')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Nazad na formu
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-32 flex items-center justify-end pr-4">
                  <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] bg-clip-text text-transparent">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="text-xs font-bold text-transparent bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] bg-clip-text">L</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl mb-1">Upravljanje Artiklima</h1>
              <p className="text-sm text-gray-600">
                Dodajte, uredite ili uklonite artikle koji će biti dostupni za korišćenje u ponudama
              </p>
            </div>
          </div>

          {/* Management Actions */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Upravljanje artiklima</h3>
              <Dialog open={showArtikalDialog} onOpenChange={setShowArtikalDialog}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingArtikal(null);
                      setArtikalForm({ naziv: '', opis: '', garancija: '', tip: 'solarni-moduli', jedinicaMere: 'kom.', kolicina: 1 });
                    }}
                    className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Dodaj artikal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingArtikal ? 'Izmeni artikal' : 'Dodaj novi artikal'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingArtikal 
                        ? 'Uredite podatke o postojećem artiklu koji će biti dostupan za korišćenje u ponudama.'
                        : 'Dodajte novi artikal koji će biti dostupan za korišćenje u ponudama. Popunite sve potrebne informacije.'
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="artikal-naziv">Naziv artikla</Label>
                      <Input
                        id="artikal-naziv"
                        value={artikalForm.naziv}
                        onChange={(e) => setArtikalForm(prev => ({ ...prev, naziv: e.target.value }))}
                        placeholder="Unesite naziv artikla"
                      />
                    </div>
                    <div>
                      <Label htmlFor="artikal-opis">Opis artikla</Label>
                      <Textarea
                        id="artikal-opis"
                        value={artikalForm.opis}
                        onChange={(e) => setArtikalForm(prev => ({ ...prev, opis: e.target.value }))}
                        placeholder="Unesite opis artikla"
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="artikal-jedinica">Jedinica mere</Label>
                        <Input
                          id="artikal-jedinica"
                          value={artikalForm.jedinicaMere}
                          onChange={(e) => setArtikalForm(prev => ({ ...prev, jedinicaMere: e.target.value }))}
                          placeholder="kom., set, m"
                        />
                      </div>
                      <div>
                        <Label htmlFor="artikal-kolicina">Količina</Label>
                        <Input
                          id="artikal-kolicina"
                          type="number"
                          value={artikalForm.kolicina}
                          onChange={(e) => setArtikalForm(prev => ({ ...prev, kolicina: parseInt(e.target.value) || 1 }))}
                          placeholder="1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="artikal-garancija">Garancija</Label>
                      <Input
                        id="artikal-garancija"
                        value={artikalForm.garancija}
                        onChange={(e) => setArtikalForm(prev => ({ ...prev, garancija: e.target.value }))}
                        placeholder="npr. 25 godina, 5 godina"
                      />
                    </div>
                    <div>
                      <Label htmlFor="artikal-tip">Tip artikla</Label>
                      <Select value={artikalForm.tip} onValueChange={(value) => setArtikalForm(prev => ({ ...prev, tip: value }))}>
                        <SelectTrigger id="artikal-tip">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solarni-moduli">Solarni moduli</SelectItem>
                          <SelectItem value="inverter">Inverter</SelectItem>
                          <SelectItem value="baterija">Baterija</SelectItem>
                          <SelectItem value="ugradnja">Ugradnja</SelectItem>
                          <SelectItem value="eps">Priključak na EPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowArtikalDialog(false);
                          setEditingArtikal(null);
                          setArtikalForm({ naziv: '', opis: '', garancija: '', tip: 'solarni-moduli', jedinicaMere: 'kom.', kolicina: 1 });
                        }}
                        className="flex-1"
                      >
                        Otkaži
                      </Button>
                      <Button
                        onClick={dodajArtikal}
                        disabled={!artikalForm.naziv || !artikalForm.opis}
                        className="flex-1 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white"
                      >
                        {editingArtikal ? 'Sačuvaj' : 'Dodaj'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Admin Table for Management */}
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Naziv</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>J.M.</TableHead>
                    <TableHead>Kol.</TableHead>
                    <TableHead>Akcije</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artikli.map((artikal) => (
                    <TableRow key={artikal.id}>
                      <TableCell className="font-medium">{artikal.naziv}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-purple-700 border-purple-300">
                          {getTipStavkeLabel(artikal.tip)}
                        </Badge>
                      </TableCell>
                      <TableCell>{artikal.jedinicaMere || 'kom.'}</TableCell>
                      <TableCell>{artikal.kolicina || '-'}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => editArtikal(artikal)}
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => ukloniArtikal(artikal.id)}
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-32 flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] bg-clip-text text-transparent">
                  LuminOne
                </span>
              </div>
            </div>
            <nav>
              <a 
                href="#" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Pomoć i podrška"
              >
                Pomoć
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Unos podataka za ponudu</h1>
          <p className="text-gray-600">
            Popunite podatke o ponudi, kupcu i parametrima. Polja označena * su obavezna.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* 1. Zaglavlje ponude */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-purple-700">Zaglavlje ponude</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nazivProjekta">Naziv projekta</Label>
                    <Input
                      id="nazivProjekta"
                      placeholder="Hotel Minerali"
                      value={formData.nazivProjekta}
                      onChange={(e) => updateFormData('nazivProjekta', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="snagaSistema">Snaga sistema (kWp)</Label>
                    <Input
                      id="snagaSistema"
                      type="number"
                      value={formData.snagaSistema}
                      onChange={(e) => updateFormData('snagaSistema', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="datum">Datum</Label>
                    <Input
                      id="datum"
                      type="date"
                      value={formData.datum}
                      onChange={(e) => updateFormData('datum', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="objekatLokacija">Objekat / Lokacija</Label>
                    <Input
                      id="objekatLokacija"
                      value={formData.objekatLokacija}
                      onChange={(e) => updateFormData('objekatLokacija', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Podaci o kupcu */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-purple-700">Podaci o kupcu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tip kupca</Label>
                  <RadioGroup value={tipKupca} onValueChange={handleTipKupcaChange} className="flex gap-6 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pravno" id="pravno" />
                      <Label htmlFor="pravno">Pravno lice</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fizicko" id="fizicko" />
                      <Label htmlFor="fizicko">Fizičko lice</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nazivKupca">Naziv kupca *</Label>
                    <Input
                      id="nazivKupca"
                      required
                      value={formData.nazivKupca}
                      onChange={(e) => updateFormData('nazivKupca', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="adresaKupca">Adresa kupca *</Label>
                    <Input
                      id="adresaKupca"
                      required
                      value={formData.adresaKupca}
                      onChange={(e) => updateFormData('adresaKupca', e.target.value)}
                    />
                  </div>
                </div>
{tipKupca === 'pravno' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pib">PIB</Label>
                      <Input
                        id="pib"
                        value={formData.pib}
                        onChange={(e) => updateFormData('pib', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mb">MB</Label>
                      <Input
                        id="mb"
                        value={formData.mb}
                        onChange={(e) => updateFormData('mb', e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefon">Telefon</Label>
                    <Input
                      id="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={(e) => updateFormData('telefon', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Stavke */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-purple-700">Stavke (Artikli / Oprema)</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentScreen('artikli')}
                    className="flex items-center gap-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
                  >
                    <Package className="h-4 w-4" />
                    Upravljaj artiklima
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {stavke.map((stavka) => (
                  <div key={stavka.id} className="flex items-end gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <Label htmlFor={`stavka-tip-${stavka.id}`}>Tip stavke</Label>
                      {stavka.tip === 'ugradnja' || stavka.tip === 'eps' ? (
                        <div className="h-10 px-3 py-2 border border-input bg-background rounded-md flex items-center font-medium text-foreground text-base">
                          {stavka.tip === 'ugradnja' ? 'Ugradnja' : 'EPS priključak'}
                        </div>
                      ) : (
                        <Select value={stavka.tip} onValueChange={(value) => updateStavka(stavka.id, 'tip', value)}>
                          <SelectTrigger id={`stavka-tip-${stavka.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {getArtikliByTip('solarni-moduli').length > 0 && (
                              <>
                                <SelectItem value="header-solarni-moduli" disabled className="font-medium text-purple-700">
                                  Solarni moduli
                                </SelectItem>
                                {getArtikliByTip('solarni-moduli').map(artikal => (
                                  <SelectItem key={`sm-${artikal.id}`} value={`artikal-${artikal.id}`}>
                                    {artikal.naziv}
                                  </SelectItem>
                                ))}
                              </>
                            )}
                            {getArtikliByTip('inverter').length > 0 && (
                              <>
                                <SelectItem value="header-inverter" disabled className="font-medium text-purple-700">
                                  Inverter
                                </SelectItem>
                                {getArtikliByTip('inverter').map(artikal => (
                                  <SelectItem key={`inv-${artikal.id}`} value={`artikal-${artikal.id}`}>
                                    {artikal.naziv}
                                  </SelectItem>
                                ))}
                              </>
                            )}
                            {getArtikliByTip('baterija').length > 0 && (
                              <>
                                <SelectItem value="header-baterija" disabled className="font-medium text-purple-700">
                                  Baterija
                                </SelectItem>
                                {getArtikliByTip('baterija').map(artikal => (
                                  <SelectItem key={`bat-${artikal.id}`} value={`artikal-${artikal.id}`}>
                                    {artikal.naziv}
                                  </SelectItem>
                                ))}
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`stavka-kolicina-${stavka.id}`}>
                        {stavka.tip === 'ugradnja' || stavka.tip === 'eps' ? 'Uključeno' : 'Količina'}
                      </Label>
                      {stavka.tip === 'ugradnja' || stavka.tip === 'eps' ? (
                        <div className="flex items-center space-x-2 h-10">
                          <Switch
                            id={`stavka-kolicina-${stavka.id}`}
                            checked={stavka.kolicina === 'Da'}
                            onCheckedChange={(checked) => updateStavka(stavka.id, 'kolicina', checked ? 'Da' : 'Ne')}
                          />
                          <Label htmlFor={`stavka-kolicina-${stavka.id}`} className="text-base">
                            {stavka.kolicina === 'Da' ? 'Da' : 'Ne'}
                          </Label>
                        </div>
                      ) : (
                        <Input
                          id={`stavka-kolicina-${stavka.id}`}
                          type="number"
                          value={stavka.kolicina}
                          onChange={(e) => updateStavka(stavka.id, 'kolicina', e.target.value)}
                        />
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => ukloniStavku(stavka.id)}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Ukloni stavku"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={dodajStavku}
                  className="w-full border-dashed border-2 hover:border-purple-300 hover:bg-purple-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj stavku
                </Button>
                
                {/* Call to Action za specifikaciju sistema */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <Button 
                      onClick={() => setCurrentScreen('system-specification')}
                      className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      Pregled Specifikacije Sistema
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      Detaljni pregled komponenti i usluga sa tehničkim specifikacijama
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* 4. Cena i uslovi */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-purple-700">Cena i uslovi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cenaBezPDV">
                      {napomena && tipKupca === 'pravno' ? 'Cena (EUR) - Član 10' : 'Cena bez PDV-a (EUR)'}
                    </Label>
                    <Input
                      id="cenaBezPDV"
                      type="number"
                      step="0.01"
                      value={formData.cenaBezPDV}
                      onChange={(e) => updateFormData('cenaBezPDV', e.target.value)}
                      placeholder="0.00"
                    />
                    {napomena && tipKupca === 'pravno' && (
                      <p className="text-sm text-purple-600 mt-1">
                        Član 10 - Oslobođeno plaćanja PDV-a
                      </p>
                    )}
                  </div>
                  
                  {!(napomena && tipKupca === 'pravno') && (
                    <>
                      <div>
                        <Label htmlFor="pdvIznos">PDV 20% (EUR)</Label>
                        <Input
                          id="pdvIznos"
                          type="number"
                          step="0.01"
                          value={formData.pdvIznos}
                          readOnly
                          className="bg-gray-100 cursor-not-allowed"
                          placeholder="Automatski se kalkuliše"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cenaSaPDV">Cena sa PDV-om (EUR)</Label>
                        <Input
                          id="cenaSaPDV"
                          type="number"
                          step="0.01"
                          value={formData.cenaSaPDV}
                          onChange={(e) => updateFormData('cenaSaPDV', e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                      
                      {/* Show calculation breakdown when values are entered */}
                      {formData.cenaBezPDV && formData.cenaSaPDV && (
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <p className="text-sm text-purple-800 font-medium mb-2">Kalkulacija PDV-a:</p>
                          <div className="space-y-1 text-sm text-purple-700">
                            <div className="flex justify-between">
                              <span>Cena bez PDV-a:</span>
                              <span>{parseFloat(formData.cenaBezPDV).toLocaleString('sr-RS')} EUR</span>
                            </div>
                            <div className="flex justify-between">
                              <span>PDV (20%):</span>
                              <span>+{parseFloat(formData.pdvIznos || '0').toLocaleString('sr-RS')} EUR</span>
                            </div>
                            <div className="flex justify-between font-medium border-t border-purple-300 pt-1">
                              <span>Ukupno sa PDV-om:</span>
                              <span>{parseFloat(formData.cenaSaPDV).toLocaleString('sr-RS')} EUR</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Show special info when Član 10 is active */}
                  {napomena && tipKupca === 'pravno' && formData.cenaBezPDV && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-800 font-medium mb-2">Član 10 - Oslobođenje PDV-a:</p>
                      <div className="space-y-1 text-sm text-purple-700">
                        <div className="flex justify-between">
                          <span>Osnovna cena:</span>
                          <span>{parseFloat(formData.cenaBezPDV).toLocaleString('sr-RS')} EUR</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PDV (20%):</span>
                          <span className="text-gray-500">Oslobođeno</span>
                        </div>
                        <div className="flex justify-between font-medium border-t border-purple-300 pt-1">
                          <span>Ukupno za plaćanje:</span>
                          <span>{parseFloat(formData.cenaBezPDV).toLocaleString('sr-RS')} EUR</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Label>Uslovi plaćanja</Label>
                  <div className="space-y-2">
                    <Input
                      placeholder="npr. 50% avans"
                      value={usloviPlacanja.prvi}
                      onChange={(e) => setUsloviPlacanja(prev => ({ ...prev, prvi: e.target.value }))}
                    />
                    <Input
                      placeholder="npr. 50% nakon isporuke"
                      value={usloviPlacanja.drugi}
                      onChange={(e) => setUsloviPlacanja(prev => ({ ...prev, drugi: e.target.value }))}
                    />
                    <Input
                      placeholder="npr. 10% račun puštenje"
                      value={usloviPlacanja.treci}
                      onChange={(e) => setUsloviPlacanja(prev => ({ ...prev, treci: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="napomena"
                      checked={napomena}
                      onCheckedChange={tipKupca === 'pravno' ? handleNapomenaChange : undefined}
                      disabled={tipKupca === 'fizicko'}
                    />
                    <Label 
                      htmlFor="napomena" 
                      className={tipKupca === 'fizicko' ? 'text-muted-foreground' : ''}
                    >
                      Napomena (Član 10)
                      {tipKupca === 'fizicko' && (
                        <span className="text-xs ml-2">(Ne primenjuje se na fizička lica)</span>
                      )}
                    </Label>
                  </div>
                  {napomena && tipKupca === 'pravno' && (
                    <Textarea
                      placeholder="Član 10 se primenjuje"
                      defaultValue="Član 10 se primenjuje"
                      className="mt-2"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* GEFF Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-purple-700">GEFF</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="geffUkljucen"
                      checked={geffUkljucen}
                      onCheckedChange={setGeffUkljucen}
                    />
                    <Label htmlFor="geffUkljucen" className="text-base">
                      {geffUkljucen ? 'Uključeno' : 'Isključeno'}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Uključite GEFF finansiranje za automatsku kalkulaciju subvencija
                  </p>
                </div>

                {geffUkljucen && (
                  <>
                    <div>
                      <Label>
                        {napomena && tipKupca === 'pravno' ? 'Cena (Član 10) za GEFF' : 'Cena sa PDV-om za GEFF'}
                      </Label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-lg font-semibold text-gray-800">
                          {napomena && tipKupca === 'pravno' 
                            ? (formData.cenaBezPDV ? `${parseFloat(formData.cenaBezPDV).toLocaleString('sr-RS')} EUR` : '0.00 EUR')
                            : (formData.cenaSaPDV ? `${parseFloat(formData.cenaSaPDV).toLocaleString('sr-RS')} EUR` : '0.00 EUR')
                          }
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {napomena && tipKupca === 'pravno' 
                            ? 'Automatski preuzeto iz sekcije "Cena i uslovi" (Član 10 - bez PDV-a)'
                            : 'Automatski preuzeto iz sekcije "Cena i uslovi"'
                          }
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="procenatSubvencije">Procenat subvencije (%)</Label>
                      <Input
                        id="procenatSubvencije"
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={formData.procenatSubvencije}
                        onChange={(e) => updateFormData('procenatSubvencije', e.target.value)}
                        placeholder="0"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Unesite procenat popusta koji se primenjuje na cenu sa PDV-om
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="cenaSaSubvencijom">Cena sa subvencijom (EUR)</Label>
                      <Input
                        id="cenaSaSubvencijom"
                        type="number"
                        step="0.01"
                        value={formData.cenaSaSubvencijom}
                        readOnly
                        className="bg-gray-100 cursor-not-allowed"
                        placeholder="Automatski se kalkuliše"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Automatski se kalkuliše na osnovu cene sa PDV-om i procenta subvencije
                      </p>
                    </div>
                    {/* Show calculation breakdown when both values are entered */}
                    {((napomena && tipKupca === 'pravno' && formData.cenaBezPDV) || (!napomena && formData.cenaSaPDV)) && formData.procenatSubvencije && parseFloat(formData.procenatSubvencije) > 0 && (
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm text-purple-800 font-medium mb-2">Kalkulacija subvencije:</p>
                        <div className="space-y-1 text-sm text-purple-700">
                          <div className="flex justify-between">
                            <span>
                              {napomena && tipKupca === 'pravno' ? 'Osnovna cena (Član 10):' : 'Cena sa PDV-om:'}
                            </span>
                            <span>
                              {napomena && tipKupca === 'pravno' 
                                ? `${parseFloat(formData.cenaBezPDV).toLocaleString('sr-RS')} EUR`
                                : `${parseFloat(formData.cenaSaPDV).toLocaleString('sr-RS')} EUR`
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Subvencija ({formData.procenatSubvencije}%):</span>
                            <span>
                              -{napomena && tipKupca === 'pravno' 
                                ? (parseFloat(formData.cenaBezPDV) * parseFloat(formData.procenatSubvencije) / 100).toLocaleString('sr-RS')
                                : (parseFloat(formData.cenaSaPDV) * parseFloat(formData.procenatSubvencije) / 100).toLocaleString('sr-RS')
                              } EUR
                            </span>
                          </div>
                          <div className="flex justify-between font-medium border-t border-purple-300 pt-1">
                            <span>Finalna cena:</span>
                            <span>{parseFloat(formData.cenaSaSubvencijom || '0').toLocaleString('sr-RS')} EUR</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* 5. Parametri lokacije */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-purple-700">Parametri lokacije / Proračun</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {krovovi.map((krov, index) => (
                  <div key={krov.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Krov {index + 1}</h4>
                      {krovovi.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => ukloniKrov(krov.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* Osnovni parametri krova */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`krov-moduli-${krov.id}`}>Broj modula</Label>
                        <Input
                          id={`krov-moduli-${krov.id}`}
                          type="number"
                          value={krov.brojModula}
                          onChange={(e) => updateKrov(krov.id, 'brojModula', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`krov-orijentacija-${krov.id}`}>Orijentacija</Label>
                        <Select value={krov.orijentacija} onValueChange={(value) => updateKrov(krov.id, 'orijentacija', value)}>
                          <SelectTrigger id={`krov-orijentacija-${krov.id}`}>
                            <SelectValue placeholder="Odaberite orijentaciju" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jug">Jug</SelectItem>
                            <SelectItem value="jugoistok">Jugoistok</SelectItem>
                            <SelectItem value="jugozapad">Jugozapad</SelectItem>
                            <SelectItem value="istok">Istok</SelectItem>
                            <SelectItem value="zapad">Zapad</SelectItem>
                            <SelectItem value="sever">Sever</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`krov-nagib-${krov.id}`}>Procenat nagiba (%)</Label>
                        <Input
                          id={`krov-nagib-${krov.id}`}
                          type="number"
                          step="0.1"
                          value={krov.procenatNagiba}
                          onChange={(e) => updateKrov(krov.id, 'procenatNagiba', e.target.value)}
                          placeholder="npr. 35"
                        />
                      </div>
                    </div>

                    {/* Slike elektrane */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Slike modela elektrane</Label>
                        <div>
                          <input
                            type="file"
                            id={`krov-slike-${krov.id}`}
                            multiple
                            accept="image/*"
                            onChange={(e) => dodajSlikuKrovu(krov.id, e.target.files)}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById(`krov-slike-${krov.id}`)?.click()}
                            className="border-purple-300 text-purple-700 hover:bg-purple-50"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Dodaj slike
                          </Button>
                        </div>
                      </div>
                      
                      {/* Preview slika */}
                      {krov.slike.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {krov.slike.map((slika) => (
                            <div key={slika.id} className="relative group bg-white rounded-lg border overflow-hidden">
                              <img
                                src={slika.url}
                                alt={slika.naziv}
                                className="w-full h-20 object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => ukloniSlikuSaKrova(krov.id, slika.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="p-2">
                                <p className="text-xs text-gray-600 truncate" title={slika.naziv}>
                                  {slika.naziv}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div 
                          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors"
                          onClick={() => document.getElementById(`krov-slike-${krov.id}`)?.click()}
                        >
                          <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">Kliknite da dodate slike modela elektrane</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF do 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={dodajKrov}
                  className="w-full border-dashed border-2 hover:border-purple-300 hover:bg-purple-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj krov
                </Button>
                <div className="pt-4 border-t">
                  <div>
                    <Label htmlFor="cenaKwh">Cena kWh</Label>
                    <Input
                      id="cenaKwh"
                      type="number"
                      step="0.01"
                      value={formData.cenaKwh}
                      onChange={(e) => updateFormData('cenaKwh', e.target.value)}
                      placeholder="npr. 0.07"
                    />
                  </div>
                </div>
                
                {/* Mesečna proizvodnja - Unos */}
                <div className="pt-4 border-t">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mesecnaProizvodnja">Mesečna proizvodnja - Bazni unos (kWh)</Label>
                      <p className="text-sm text-gray-600 mb-3">
                        Unesite baznu proizvodnju za svaki mesec (Jan-Dec), jedan broj po liniji:
                      </p>
                      <Textarea
                        id="mesecnaProizvodnja"
                        placeholder="1,684&#10;2,527&#10;4,527&#10;6,052&#10;7,016&#10;7,685&#10;7,766&#10;6,807&#10;4,966&#10;3,503&#10;2,054&#10;1,284"
                        className="min-h-[180px] font-mono text-sm"
                        value={formData.mesecnaProizvodnja}
                        onChange={(e) => updateFormData('mesecnaProizvodnja', e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Tip: Možete kopirati podatke iz Excel-a ili bilo kog izvora i nalepiti ovde
                      </p>
                    </div>

                    {/* Tip sistema */}
                    <div className="bg-gradient-to-r from-purple-50 to-teal-50 p-4 rounded-lg border border-purple-200">
                      <Label className="font-medium text-purple-700 mb-3 block">Tip sistema / Iskorišćenost</Label>
                      <div className="space-y-3">
                        <RadioGroup value={tipSistema} onValueChange={setTipSistema} className="grid grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="text-sm">Standard sistem (-7%)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="premium" id="premium" />
                            <Label htmlFor="premium" className="text-sm">Premium sistem (-3%)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="solaredge" id="solaredge" />
                            <Label htmlFor="solaredge" className="text-sm">SolarEdge sistem (0%)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom" className="text-sm">Custom (proizvoljno)</Label>
                          </div>
                        </RadioGroup>
                        
                        {tipSistema === 'custom' && (
                          <div className="mt-3">
                            <Label htmlFor="customIskoriscenost" className="text-sm">Iskorišćenost (%)</Label>
                            <Input
                              id="customIskoriscenost"
                              type="number"
                              step="0.1"
                              min="0"
                              max="200"
                              value={customIskoriscenost}
                              onChange={(e) => setCustomIskoriscenost(e.target.value)}
                              className="mt-1 w-32"
                              placeholder="100"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Finalna proizvodnja sa triggerima */}
                    {formData.mesecnaProizvodnja && (
                      <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg border border-teal-200">
                        <Label className="font-medium text-teal-700 mb-3 block">
                          Finalna mesečna proizvodnja sa {
                            tipSistema === 'standard' ? 'Standard sistemom (-7%)' :
                            tipSistema === 'premium' ? 'Premium sistemom (-3%)' :
                            tipSistema === 'solaredge' ? 'SolarEdge sistemom (0%)' :
                            `Custom sistemom (${customIskoriscenost}%)`
                          }
                        </Label>
                        
                        {(() => {
                          // Parse monthly production data - ignore commas and dots as they are thousands separators
                          const bazniPodaci = formData.mesecnaProizvodnja
                            .split(/[\n]/)
                            .map((val: string) => {
                              // Remove all commas and dots, then parse as integer
                              const cleanedVal = val.trim().replace(/[,.]/g, '');
                              return parseInt(cleanedVal) || 0;
                            })
                            .filter((val: number) => val > 0);

                          if (bazniPodaci.length === 0) return null;

                          let factor = 1;
                          if (tipSistema === 'standard') factor = 0.93; // -7%
                          else if (tipSistema === 'premium') factor = 0.97; // -3%
                          else if (tipSistema === 'solaredge') factor = 1.0; // 0%
                          else if (tipSistema === 'custom') factor = parseFloat(customIskoriscenost) / 100;

                          const finalniPodaci = bazniPodaci.map(val => Math.round(val * factor));
                          const ukupnoBazno = bazniPodaci.reduce((sum, val) => sum + val, 0);
                          const ukupnoFinalno = finalniPodaci.reduce((sum, val) => sum + val, 0);
                          const razlika = ukupnoFinalno - ukupnoBazno;
                          const procenatRazlike = ukupnoBazno > 0 ? ((razlika / ukupnoBazno) * 100) : 0;

                          return (
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-sm">
                                {finalniPodaci.slice(0, 12).map((val, index) => {
                                  const meseci = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
                                  return (
                                    <div key={index} className="bg-white p-2 rounded border text-center">
                                      <div className="text-xs text-gray-600">{meseci[index]}</div>
                                      <div className="font-medium text-teal-700">{val.toLocaleString('sr-RS')}</div>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              <div className="flex justify-between items-center pt-3 border-t border-teal-300">
                                <div className="text-sm">
                                  <span className="text-gray-600">Bazno ukupno: </span>
                                  <span className="font-medium text-gray-800">{ukupnoBazno.toLocaleString('sr-RS')} kWh</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-600">Finalno ukupno: </span>
                                  <span className="font-bold text-teal-700">{ukupnoFinalno.toLocaleString('sr-RS')} kWh</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-600">Razlika: </span>
                                  <span className={`font-bold ${razlika >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {razlika >= 0 ? '+' : ''}{razlika.toLocaleString('sr-RS')} kWh ({procenatRazlike >= 0 ? '+' : ''}{procenatRazlike.toFixed(1)}%)
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                    
                    {/* Call to Action za analizu proizvodnje */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <Button 
                          onClick={() => setCurrentScreen('chart-generator')}
                          className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                          <MessageSquare className="h-5 w-5 mr-2" />
                          Kreiraj Analizu Proizvodnje
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">
                          Napravite detaljnu analizu sa mesečnim dijagramima, sezonskim pregledom i ključnim indikatorima
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Godišnja ušteda CO₂ */}
                <div className="pt-4 border-t">
                  <div>
                    <Label htmlFor="godisnjaUsteda">Godišnja ušteda CO₂ (t)</Label>
                    <Input
                      id="godisnjaUsteda"
                      type="number"
                      step="0.01"
                      value={formData.godisnjaUsteda}
                      onChange={(e) => updateFormData('godisnjaUsteda', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

{/* 6. ROI - Only for legal entities */}
            {tipKupca === 'pravno' && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-700">ROI Analiza</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="godisnjaProizvodnja">Godišnja proizvodnja (kWh)</Label>
                    <Input
                      id="godisnjaProizvodnja"
                      type="number"
                      value={formData.godisnjaProizvodnja}
                      onChange={(e) => updateFormData('godisnjaProizvodnja', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="degradacijaNakon30">Degradacija nakon 30 godina (%)</Label>
                    <Input
                      id="degradacijaNakon30"
                      type="number"
                      step="0.1"
                      placeholder="20"
                      value={formData.degradacijaNakon30}
                      onChange={(e) => updateFormData('degradacijaNakon30', e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Standardno je 20% degradacija efikasnosti nakon 30 godina
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="povratInvesticije">Povrat investicije</Label>
                    <Input
                      id="povratInvesticije"
                      placeholder="npr. 2 godine i 5 meseci"
                      value={formData.povratInvesticije}
                      onChange={(e) => updateFormData('povratInvesticije', e.target.value)}
                    />
                  </div>
                  
                  {/* Call to Action za detaljnu ROI analizu */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <Button 
                        onClick={() => setCurrentScreen('roi-analysis')}
                        className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Kreiraj Interaktivnu ROI Analizu
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        Napravite detaljnu analizu sa grafikonima koji se mogu izvoziti u PNG format
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Sticky Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
            >
              Sačuvaj draft
            </Button>
            <Button
              size="lg"
              onClick={() => {
                // Pass the system type and efficiency data to Final Proposal
                const updatedFormData = {
                  ...formData,
                  tipSistema,
                  customIskoriscenost
                };
                setCurrentScreen('final-proposal');
              }}
              className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white shadow-lg"
            >
              <Eye className="h-4 w-4 mr-2" />
              Generiši Konačnu Ponudu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}