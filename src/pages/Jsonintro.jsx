import { useState, useEffect } from 'react'

function Jsonintro() {
    const [introsData, setIntrosData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibilitySettings, setVisibilitySettings] = useState({
        showName: true,
        showMascot: true,
        showImage: true,
        showPersonalStatement: true,
        showBackgrounds: true,
        showClasses: true,
        showExtraInfo: true,
        showQuote: true,
        showLinks: true
    })

    useEffect(() => {
        const baseUrl = import.meta.env.BASE_URL || '/'
        const jsonPath = `${baseUrl}intros.json`.replace(/\/+/g, '/')

        fetch(jsonPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                }
                return response.json()
            })
            .then(data => {
                setIntrosData(data)
                setFilteredData(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Fetch error:', err)
                setError(`Failed to load data: ${err.message}`)
                setLoading(false)
            })
    }, [])

    // Filter data based on search term
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredData(introsData)
        } else {
            const searchLower = searchTerm.toLowerCase()
            const filtered = introsData.filter(intro => {
                const firstName = intro.name.first?.toLowerCase() || ''
                const lastName = intro.name.last?.toLowerCase() || ''
                return firstName.includes(searchLower) || lastName.includes(searchLower)
            })
            setFilteredData(filtered)
        }
        setCurrentIndex(0) // Reset to first result when search changes
    }, [searchTerm, introsData])

    if (loading) {
        return (
            <main>
                <h2>Student Introductions</h2>
                <p>Loading...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main>
                <h2>Student Introductions</h2>
                <p>Error loading data: {error}</p>
            </main>
        )
    }

    const handleCheckboxChange = (setting) => {
        setVisibilitySettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }))
    }

    const handlePrevious = () => {
        if (filteredData.length > 0) {
            setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredData.length - 1))
        }
    }

    const handleNext = () => {
        if (filteredData.length > 0) {
            setCurrentIndex(prev => (prev < filteredData.length - 1 ? prev + 1 : 0))
        }
    }

    if (loading) {
        return (
            <main>
                <h2>Student Introductions</h2>
                <p>Loading...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main>
                <h2>Student Introductions</h2>
                <p>Error loading data: {error}</p>
            </main>
        )
    }

    const currentIntro = filteredData[currentIndex]

    return (
        <main>
            <h2>Student Introductions</h2>
            
            {/* Control Panel */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
                {/* Search Input */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="search-input" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Search by Name:
                    </label>
                    <input
                        id="search-input"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter first or last name..."
                        style={{ width: '100%', maxWidth: '400px', padding: '8px', fontSize: '16px' }}
                    />
                </div>

                {/* Checkboxes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={visibilitySettings.showName}
                            onChange={() => handleCheckboxChange('showName')}
                        />
                        Name
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={visibilitySettings.showMascot}
                            onChange={() => handleCheckboxChange('showMascot')}
                        />
                        Mascot
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={visibilitySettings.showImage}
                            onChange={() => handleCheckboxChange('showImage')}
                        />
                        Image
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={visibilitySettings.showPersonalStatement}
                            onChange={() => handleCheckboxChange('showPersonalStatement')}
                        />
                        Personal Statement
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={visibilitySettings.showBackgrounds}
                            onChange={() => handleCheckboxChange('showBackgrounds')}
                        />
                        Backgrounds
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={visibilitySettings.showClasses}
                            onChange={() => handleCheckboxChange('showClasses')}
                        />
                        Classes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={visibilitySettings.showExtraInfo}
                            onChange={() => handleCheckboxChange('showExtraInfo')}
                        />
                        Extra Information
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={visibilitySettings.showQuote}
                            onChange={() => handleCheckboxChange('showQuote')}
                        />
                        Quote
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={visibilitySettings.showLinks}
                            onChange={() => handleCheckboxChange('showLinks')}
                        />
                        Links
                    </label>
                </div>
            </div>

            {/* Counter */}
            <div style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' }}>
                Showing {filteredData.length} student{filteredData.length !== 1 ? 's' : ''}
            </div>

            {/* Slideshow */}
            {filteredData.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', border: '1px solid #ccc' }}>
                    <p>No students found matching your search.</p>
                </div>
            ) : (
                <div>
                    {/* Navigation Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <button
                            onClick={handlePrevious}
                            disabled={filteredData.length === 0}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                cursor: filteredData.length === 0 ? 'not-allowed' : 'pointer',
                                backgroundColor: filteredData.length === 0 ? '#ccc' : '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            Previous
                        </button>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            {currentIndex + 1} of {filteredData.length}
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={filteredData.length === 0}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                cursor: filteredData.length === 0 ? 'not-allowed' : 'pointer',
                                backgroundColor: filteredData.length === 0 ? '#ccc' : '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            Next
                        </button>
                    </div>

                    {/* Current Student Introduction */}
                    <div style={{ border: '1px solid #ccc', padding: '20px', minHeight: '400px' }}>
                        {currentIntro && (
                            <div key={currentIntro.prefix || currentIndex}>
                                {/* Name and Mascot */}
                                {(visibilitySettings.showName || visibilitySettings.showMascot) && (
                                    <h3 style={{ textAlign: "center" }}>
                                        <strong>
                                            {visibilitySettings.showName && (
                                                <>
                                                    {currentIntro.name.first} {currentIntro.name.middleInitial ? currentIntro.name.middleInitial + '. ' : ''}{currentIntro.name.last}
                                                    {currentIntro.name.preferred && ` (${currentIntro.name.preferred})`}
                                                </>
                                            )}
                                            {visibilitySettings.showName && visibilitySettings.showMascot && (currentIntro.divider || ' | ')}
                                            {visibilitySettings.showMascot && currentIntro.mascot}
                                        </strong>
                                    </h3>
                                )}

                                {/* Image */}
                                {visibilitySettings.showImage && currentIntro.media && currentIntro.media.hasImage && (
                                    <figure style={{ textAlign: "center" }}>
                                        <img
                                            src={`https://dvonb.xyz${currentIntro.media.src}`}
                                            alt={`${currentIntro.name.first} ${currentIntro.name.last}`}
                                            style={{ maxWidth: "400px" }}
                                        />
                                        <figcaption>
                                            <em>{currentIntro.media.caption}</em>
                                        </figcaption>
                                    </figure>
                                )}

                                {/* Personal Statement (Acknowledgement) */}
                                {visibilitySettings.showPersonalStatement && (
                                    <p style={{ fontSize: "0.8em", color: "#888", textAlign: "center", marginBottom: "20px" }}>
                                        {currentIntro.acknowledgement} ({currentIntro.acknowledgementDate})
                                    </p>
                                )}

                                {/* Background Information */}
                                {visibilitySettings.showBackgrounds && (
                                    <ul style={{ listStyleType: "disc" }}>
                                        <li>
                                            <strong>Personal Background</strong> - {currentIntro.backgrounds.personal}
                                        </li>
                                        <li>
                                            <strong>Professional Background</strong> - {currentIntro.backgrounds.professional}
                                        </li>
                                        <li>
                                            <strong>Academic Background</strong> - {currentIntro.backgrounds.academic}
                                        </li>
                                        {currentIntro.backgrounds.subject && (
                                            <li>
                                                <strong>Subject Background</strong> - {currentIntro.backgrounds.subject}
                                            </li>
                                        )}
                                    </ul>
                                )}

                                {/* Courses */}
                                {visibilitySettings.showClasses && (
                                    <ul style={{ listStyleType: "disc" }}>
                                        <li>
                                            <strong>Courses I'm Taking, & Why:</strong>
                                            <br />
                                            <ul>
                                                {currentIntro.courses.map((course, courseIndex) => (
                                                    <li key={courseIndex}>
                                                        <strong>{course.code} - {course.name} - </strong>{course.reason}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                )}

                                {/* Extra Information (Platform, Fun Fact, Additional) */}
                                {visibilitySettings.showExtraInfo && (
                                    <>
                                        {/* Platform Information */}
                                        <p style={{ textAlign: "center", fontSize: "0.9em", color: "#666" }}>
                                            {currentIntro.platform.device} | {currentIntro.platform.os}
                                        </p>

                                        {/* Fun Fact */}
                                        {currentIntro.funFact && (
                                            <p style={{ textAlign: "center", fontStyle: "italic", marginTop: "20px" }}>
                                                "{currentIntro.funFact}"
                                            </p>
                                        )}

                                        {/* Additional Info */}
                                        {currentIntro.additional && currentIntro.additional.trim() && (
                                            <p style={{ textAlign: "center", marginTop: "10px" }}>
                                                {currentIntro.additional}
                                            </p>
                                        )}
                                    </>
                                )}

                                {/* Quote */}
                                {visibilitySettings.showQuote && currentIntro.quote && (
                                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                                        "{currentIntro.quote.text}"
                                        <br />
                                        - <em>{currentIntro.quote.author}</em>
                                    </p>
                                )}

                                {/* Links */}
                                {visibilitySettings.showLinks && currentIntro.links && (
                                    <ul style={{ listStyleType: "disc" }}>
                                        <li>
                                            <strong>Links:</strong>
                                            <br />
                                            <ul>
                                                {currentIntro.links.charlotte && (
                                                    <li><strong>Charlotte Webpage:</strong> <a href={currentIntro.links.charlotte} target="_blank" rel="noopener noreferrer">{currentIntro.links.charlotte}</a></li>
                                                )}
                                                {currentIntro.links.github && (
                                                    <li><strong>GitHub:</strong> <a href={currentIntro.links.github} target="_blank" rel="noopener noreferrer">{currentIntro.links.github}</a></li>
                                                )}
                                                {currentIntro.links.githubio && (
                                                    <li><strong>GitHub Pages:</strong> <a href={currentIntro.links.githubio} target="_blank" rel="noopener noreferrer">{currentIntro.links.githubio}</a></li>
                                                )}
                                                {currentIntro.links.itis3135 && (
                                                    <li><strong>ITIS 3135:</strong> <a href={currentIntro.links.itis3135} target="_blank" rel="noopener noreferrer">{currentIntro.links.itis3135}</a></li>
                                                )}
                                                {currentIntro.links.freecodecamp && (
                                                    <li><strong>FreeCodeCamp:</strong> <a href={currentIntro.links.freecodecamp} target="_blank" rel="noopener noreferrer">{currentIntro.links.freecodecamp}</a></li>
                                                )}
                                                {currentIntro.links.codecademy && (
                                                    <li><strong>Codecademy:</strong> <a href={currentIntro.links.codecademy} target="_blank" rel="noopener noreferrer">{currentIntro.links.codecademy}</a></li>
                                                )}
                                                {currentIntro.links.linkedin && (
                                                    <li><strong>LinkedIn:</strong> <a href={currentIntro.links.linkedin} target="_blank" rel="noopener noreferrer">{currentIntro.links.linkedin}</a></li>
                                                )}
                                            </ul>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    )
}

export default Jsonintro