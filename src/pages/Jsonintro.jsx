import introsData from '../assets/intros.json'

function Jsonintro() {
    return (
        <main>
            <h2>Student Introductions</h2>
            <div style={{ maxHeight: '80vh', overflowY: 'auto', border: '1px solid #ccc', padding: '20px' }}>
                {introsData.map((intro, index) => (
                    <div key={intro.prefix || index} style={{ marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                        {/* Name and Mascot */}
                        <h3 style={{ textAlign: "center" }}>
                            <strong>
                                {intro.name.first} {intro.name.middleInitial ? intro.name.middleInitial + '. ' : ''}{intro.name.last}
                                {intro.name.preferred && ` (${intro.name.preferred})`}
                                {intro.divider || ' | '}
                                {intro.mascot}
                            </strong>
                        </h3>

                        {/* Image */}
                        {intro.media && intro.media.hasImage && (
                            <figure style={{ textAlign: "center" }}>
                                <img
                                    src={`https://dvonb.xyz${intro.media.src}`}
                                    alt={`${intro.name.first} ${intro.name.last}`}
                                    style={{ maxWidth: "400px" }}
                                />
                                <figcaption>
                                    <em>{intro.media.caption}</em>
                                </figcaption>
                            </figure>
                        )}

                        {/* Platform Information */}
                        <p style={{ textAlign: "center", fontSize: "0.9em", color: "#666" }}>
                            {intro.platform.device} | {intro.platform.os}
                        </p>

                        {/* Acknowledgement */}
                        <p style={{ fontSize: "0.8em", color: "#888", textAlign: "center", marginBottom: "20px" }}>
                            {intro.acknowledgement} ({intro.acknowledgementDate})
                        </p>

                        {/* Background Information */}
                        <ul style={{ listStyleType: "disc" }}>
                            <li>
                                <strong>Personal Background</strong> - {intro.backgrounds.personal}
                            </li>
                            <li>
                                <strong>Professional Background</strong> - {intro.backgrounds.professional}
                            </li>
                            <li>
                                <strong>Academic Background</strong> - {intro.backgrounds.academic}
                            </li>
                            {intro.backgrounds.subject && (
                                <li>
                                    <strong>Subject Background</strong> - {intro.backgrounds.subject}
                                </li>
                            )}
                        </ul>

                        {/* Courses */}
                        <ul style={{ listStyleType: "disc" }}>
                            <li>
                                <strong>Courses I'm Taking, & Why:</strong>
                                <br />
                                <ul>
                                    {intro.courses.map((course, courseIndex) => (
                                        <li key={courseIndex}>
                                            <strong>{course.code} - {course.name} - </strong>{course.reason}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>

                        {/* Links */}
                        {intro.links && (
                            <ul style={{ listStyleType: "disc" }}>
                                <li>
                                    <strong>Links:</strong>
                                    <br />
                                    <ul>
                                        {intro.links.charlotte && (
                                            <li><strong>Charlotte Webpage:</strong> <a href={intro.links.charlotte} target="_blank" rel="noopener noreferrer">{intro.links.charlotte}</a></li>
                                        )}
                                        {intro.links.github && (
                                            <li><strong>GitHub:</strong> <a href={intro.links.github} target="_blank" rel="noopener noreferrer">{intro.links.github}</a></li>
                                        )}
                                        {intro.links.githubio && (
                                            <li><strong>GitHub Pages:</strong> <a href={intro.links.githubio} target="_blank" rel="noopener noreferrer">{intro.links.githubio}</a></li>
                                        )}
                                        {intro.links.itis3135 && (
                                            <li><strong>ITIS 3135:</strong> <a href={intro.links.itis3135} target="_blank" rel="noopener noreferrer">{intro.links.itis3135}</a></li>
                                        )}
                                        {intro.links.freecodecamp && (
                                            <li><strong>FreeCodeCamp:</strong> <a href={intro.links.freecodecamp} target="_blank" rel="noopener noreferrer">{intro.links.freecodecamp}</a></li>
                                        )}
                                        {intro.links.codecademy && (
                                            <li><strong>Codecademy:</strong> <a href={intro.links.codecademy} target="_blank" rel="noopener noreferrer">{intro.links.codecademy}</a></li>
                                        )}
                                        {intro.links.linkedin && (
                                            <li><strong>LinkedIn:</strong> <a href={intro.links.linkedin} target="_blank" rel="noopener noreferrer">{intro.links.linkedin}</a></li>
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        )}

                        {/* Fun Fact */}
                        {intro.funFact && (
                            <p style={{ textAlign: "center", fontStyle: "italic", marginTop: "20px" }}>
                                "{intro.funFact}"
                            </p>
                        )}

                        {/* Additional Info */}
                        {intro.additional && intro.additional.trim() && (
                            <p style={{ textAlign: "center", marginTop: "10px" }}>
                                {intro.additional}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Jsonintro