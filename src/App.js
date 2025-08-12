import React, { useState } from 'react'
import { Search, BookOpen, FileText, Video, Image, ChevronDown, ChevronUp, HelpCircle, ExternalLink } from 'lucide-react'

// TDL Help Desk - Beautiful Blue Theme Interface
const DATA = [
  {
    id: 'what-is-tdl',
    question: 'What is TDL (Tally Definition Language)?',
    answer: `TDL (Tally Definition Language) is the native development language used to customize Tally (ERP) UI, reports, vouchers, and integrations. It's definition-driven (Definitions → Forms → Parts → Lines → Fields) and lets you extend Tally without modifying its core. Typical uses: add UDFs (user-defined fields), custom reports, invoice templates, and integration endpoints.`,
    guideUrl: 'https://help.tallysolutions.com/developer-reference/',
    pdfUrl: 'https://help.tallysolutions.com/seriesa/rel-5-4/en/help/TDL_Reference_Manual.pdf',
    videoUrl: 'https://www.youtube.com/watch?v=4-vBOg6oCqk',
    imgUrl: 'https://help.tallysolutions.com/article/DeveloperReference/tdlreference/objects_and_collections.htm',
    category: 'Fundamentals',
    difficulty: 'Beginner'
  },
  {
    id: 'create-custom-vouchers',
    question: 'How to create custom vouchers in TDL?',
    answer: `Create a Voucher Type definition and design its Form → Parts → Lines → Fields. Add business UDFs if needed and use Collection definitions as the data-source. Typical steps: define UDFs, alter voucher Parts (e.g., VCH Narration), register the voucher type, and add validation/actions for save/submit.`,
    guideUrl: 'https://help.tallysolutions.com/developer-reference/tally-definition-language/how-to-customise-voucher-and-invoice-using-tdl/',
    videoUrl: 'https://www.youtube.com/watch?v=vPdBQfaLxS0',
    imgUrl: 'https://tdlexpert.com/index.php?threads/customize-voucher.10656/',
    category: 'Customization',
    difficulty: 'Intermediate'
  },
  {
    id: 'tdl-syntax-basic-functions',
    question: 'TDL syntax and basic functions explained',
    answer: `TDL uses square-bracket definitions: [Definition Type : Name]. Accessors: $FieldName (fields/methods), $$FunctionName() (built-in/user functions). Main constructs: Definitions, Attributes, Modifiers, Collections. The Reference Manual lists all built-in $$Functions and their parameters.`,
    guideUrl: 'https://help.tallysolutions.com/developer-reference/tally-definition-language/what-are-definitions-attributes-and-modifiers-in-tdl/',
    pdfUrl: 'https://help.tallysolutions.com/seriesa/rel-5-4/en/help/TDL_Reference_Manual.pdf',
    videoUrl: 'https://www.youtube.com/watch?v=0wIh-W_B94c',
    category: 'Fundamentals',
    difficulty: 'Beginner'
  },
  {
    id: 'customize-invoices',
    question: 'How to customize invoices using TDL?',
    answer: `Redefine the invoice Report → Form → Part → Line → Field. You can add fields, move columns, change headings, add images (item images/logo), and implement conditional formatting. For advanced print templates, use Productivity Suites method (design Word/Excel XML template and map fields).`,
    guideUrl: 'https://help.tallysolutions.com/developer-reference/tally-definition-language/how-to-customise-voucher-and-invoice-using-tdl/',
    videoUrl: 'https://www.youtube.com/watch?v=5EosPSocBwI',
    imgUrl: 'https://learnwells.com/customized-invoice-tally-prime-tdl/',
    category: 'Customization',
    difficulty: 'Intermediate'
  },
  {
    id: 'objects-data-types',
    question: 'TDL object-oriented concepts and data types',
    answer: `TDL objects: Reports, Forms, Parts, Lines, Fields, Collections, Methods. Collections are lists of objects (e.g., vouchers list). Data types include String, Number, Date, Logical, Amount, Quantity, Rate. Objects expose methods (to fetch values) and sub-collections.`,
    guideUrl: 'https://help.tallysolutions.com/article/DeveloperReference/tdlreference/objects_and_collections.htm',
    videoUrl: 'https://www.youtube.com/watch?v=MjWOj_EWvO8',
    category: 'Advanced',
    difficulty: 'Advanced'
  },
  {
    id: 'custom-reports',
    question: 'How to create custom reports in TDL?',
    answer: `Define a [Report : YourReport] then attach a Form containing Parts, Lines and Fields. Use Collections as data sources and add Filters/Criteria to restrict rows. Use Functions for computed columns and Totals for aggregates. Finally register the report in a Menu for user access.`,
    guideUrl: 'https://help.tallysolutions.com/developer-reference/',
    videoUrl: 'https://www.youtube.com/playlist?list=PLDrSd6GWj67wnNNPjnkGH3ovAl_fPQLQi',
    category: 'Reports',
    difficulty: 'Intermediate'
  },
  {
    id: 'validation-udfs',
    question: 'TDL validation controls and user-defined fields',
    answer: `Add UDFs with [System : UDF] and place them on voucher/master lines. Use attributes like "Validate: <condition>" or write a Function and call it On Accept/On Save to enforce rules. You can restrict allowed values and show messages using Report: Info/Err.`,
    guideUrl: 'https://help.tallysolutions.com/developer-reference/tally-definition-language/how-to-customise-voucher-and-invoice-using-tdl/',
    videoUrl: 'https://www.youtube.com/watch?v=4-vBOg6oCqk',
    category: 'Advanced',
    difficulty: 'Advanced'
  },
  {
    id: 'action-event-framework',
    question: 'Action and event framework in TDL',
    answer: `TDL uses Actions (Display, Alter, Save, Print, Alter Collection) and Events (On Accept, On Value Change). Functions are defined via [Function : Name] and invoked via Action attributes or Keys/Buttons. Actions can change Collections, call other Reports, or perform DB updates.`,
    guideUrl: 'https://tallystack.in/blog/tally-questions/actions-in-tally-definition-language-tdl/',
    videoUrl: 'https://www.youtube.com/watch?v=-VEVd2DnjjQ',
    category: 'Advanced',
    difficulty: 'Advanced'
  },
  {
    id: 'print-custom-documents',
    question: 'How to print customized documents in TDL?',
    answer: `Printing is handled via the Report → Form → Part → Line → Field structure; you can associate a Word/Excel XML template (Productivity Suites) or fully design the print layout in TDL. Use Print Attributes and Formatting Modifiers to set paper size, margins and headers/footers.`,
    guideUrl: 'https://help.tallysolutions.com/developer-reference/tally-definition-language/customisation-using-productivity-suites-tdl/',
    pdfUrl: 'https://help.tallysolutions.com/seriesa/rel-5-4/en/help/TDL_Reference_Manual.pdf',
    videoUrl: 'https://www.youtube.com/watch?v=0lWCbtw5HWQ',
    category: 'Customization',
    difficulty: 'Intermediate'
  },
  {
    id: 'collections-symbols',
    question: 'TDL collections and symbols usage',
    answer: `Collections gather objects for listing/processing; define filters and methods to source data. Symbols/prefixes: $FieldName (accessor), $$FunctionName() (call), #, ! and other meta-symbols change behavior. Collections + Symbols are the backbone for dynamic reports and integrations.`,
    guideUrl: 'https://help.tallysolutions.com/article/DeveloperReference/tdlreference/tdl_components.htm',
    videoUrl: 'https://www.youtube.com/watch?v=uC9BEqP3xAM',
    category: 'Advanced',
    difficulty: 'Advanced'
  }
]

export default function TallyHelpDesk() {
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(DATA.map(item => item.category)))]

  const filtered = DATA.filter(d => {
    const matchesSearch = d.question.toLowerCase().includes(query.toLowerCase()) ||
                          d.answer.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // ✅ Prediction suggestions (max 5 results)
  const suggestions = DATA.filter(d =>
    d.question.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  ).slice(0, 5)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-blue-100 text-blue-800'
      case 'Advanced': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': 'bg-blue-50 text-blue-700 border-blue-200',
      'Customization': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Reports': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Advanced': 'bg-purple-50 text-purple-700 border-purple-200'
    }
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-full mr-4">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Tally Help Desk
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-6">
              Your comprehensive guide to Tally Definition Language (TDL)
            </p>
            <div className="flex items-center justify-center text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full inline-block">
              <BookOpen className="w-4 h-4 mr-2" />
              10 Essential Topics • Videos • Guides • Documentation
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-blue-100">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)}
              placeholder="Search TDL topics, syntax, functions, or concepts..." 
              className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-blue-100 focus:border-blue-400 focus:outline-none transition-colors"
            />

            {/* ✅ Prediction Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-blue-100 rounded-lg mt-1 w-full shadow-lg max-h-48 overflow-y-auto">
                {suggestions.map((s, i) => (
                  <li 
                    key={i} 
                    onClick={() => setQuery(s.question)}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                  >
                    {s.question}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filtered.length}</span> of {DATA.length} topics
            {selectedCategory !== 'All' && (
              <span className="ml-2 text-sm text-gray-500">in {selectedCategory}</span>
            )}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filtered.map(item => (
            <article key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50 overflow-hidden">
              <button 
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full text-left p-6 hover:bg-blue-25 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.question}
                    </h2>
                    {openId !== item.id && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.answer.substring(0, 120)}...
                      </p>
                    )}
                  </div>
                  <div className="ml-4 p-2 rounded-full bg-blue-50 text-blue-600">
                    {openId === item.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </button>

              {openId === item.id && (
                <div className="px-6 pb-6 border-t border-blue-50 bg-gradient-to-r from-blue-25 to-cyan-25">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      {item.answer}
                    </p>
                    {/* ... rest of your resource links and preview code (unchanged) */}
                  </div>
                </div>
              )}
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 border border-blue-100">
                <Search className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No matching topics found</h3>
                <p className="text-gray-500 mb-4">Try different keywords like 'voucher', 'invoice', 'collection', or 'function'</p>
                <button 
                  onClick={() => { setQuery(''); setSelectedCategory('All') }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-blue-100 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-full mr-3">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Need More Help?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            This help desk covers the most popular TDL questions with official documentation, video tutorials, and community resources.
          </p>
          <p className="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full inline-block">
            Sources: Official Tally Developer Docs • TDL Reference Manual • Community Tutorials • YouTube Guides
          </p>
        </footer>
      </div>
    </div>
  )
}



