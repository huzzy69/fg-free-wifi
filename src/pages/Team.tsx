import React, { useEffect, useState } from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { api, type TeamMember } from '../api';
import './Team.css';

/* ── Fallback avatar ─────────────────────────── */
const AvatarFallback: React.FC<{ name: string }> = ({ name }) => {
    const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
    return (
        <div className="team-photo-fallback">
            <span>{initials}</span>
        </div>
    );
};

/* ── Single card ─────────────────────────────── */
const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
    const [imgError, setImgError] = useState(false);
    const hasPhoto = Boolean(member.photo) && !imgError;

    return (
        <div className="team-card">
            <div className="team-card-photo-wrap">
                {hasPhoto ? (
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="team-card-photo"
                        onError={() => setImgError(true)}
                        loading="lazy"
                    />
                ) : (
                    <AvatarFallback name={member.name} />
                )}
                <div className="team-photo-overlay" />
            </div>

            <div className="team-card-body">
                <h3 className="team-member-name">{member.name}</h3>
                <span className="team-member-designation">{member.designation}</span>
                <p className="team-member-bio">{member.bio}</p>

                {(member.email || member.linkedin) && (
                    <div className="team-socials">
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="team-social-btn"
                                aria-label={`${member.name} LinkedIn`}
                            >
                                <Linkedin size={16} />
                            </a>
                        )}
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="team-social-btn"
                                aria-label={`Email ${member.name}`}
                            >
                                <Mail size={16} />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

/* ── Skeleton card (loading state) ───────────── */
const SkeletonCard: React.FC = () => (
    <div className="team-card team-card-skeleton">
        <div className="skeleton-photo" />
        <div className="team-card-body" style={{ gap: 8 }}>
            <div className="skeleton-line" style={{ width: '60%', height: 18 }} />
            <div className="skeleton-line" style={{ width: '40%', height: 12 }} />
            <div className="skeleton-line" style={{ width: '100%', height: 12, marginTop: 8 }} />
            <div className="skeleton-line" style={{ width: '90%', height: 12 }} />
            <div className="skeleton-line" style={{ width: '70%', height: 12 }} />
        </div>
    </div>
);

/* ── Page ────────────────────────────────────── */
const Team: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.team.getAll().then(data => {
            setMembers(data);
            setLoading(false);
        });
    }, []);

    // Split members into sections
    const chairman = members.find(m => m.id === 'tm_mss');
    const globalBoard = members.filter(m => ['tm_b1', 'tm_pg', 'tm_hbb'].includes(m.id))
        .sort((a, b) => {
            const order = ['tm_b1', 'tm_pg', 'tm_hbb'];
            return order.indexOf(a.id) - order.indexOf(b.id);
        });
    const regionalTeam = members.filter(m =>
        !['tm_mss', 'tm_b1', 'tm_pg', 'tm_hbb'].includes(m.id)
    );

    return (
        <div className="team-page">
            {/* ── Hero ── */}
            <section className="team-hero">
                <div className="team-hero-bg" />
                <div className="container team-hero-content">
                    <span className="team-eyebrow">The People Behind the Network</span>
                    <h1>Meet Our <span className="team-highlight">Team</span></h1>
                    <p className="team-hero-desc">
                        A passionate group of innovators, engineers, and marketers working together
                        to bridge the digital divide.
                    </p>
                </div>
            </section>

            {/* ── Cards ── */}
            <section className="team-section">
                <div className="container">
                    {loading ? (
                        <div className="team-grid">
                            {Array.from({ length: 19 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : (
                        <>
                            {/* ── Leadership ── */}
                            {chairman && (
                                <div className="team-leadership-centered">
                                    <TeamCard member={chairman} />
                                </div>
                            )}

                            {/* ── Global Advisory / Board ── */}
                            {globalBoard.length > 0 && (
                                <div className="team-board-section">
                                    <div className="team-grid team-board-grid">
                                        {globalBoard.map(m => <TeamCard key={m.id} member={m} />)}
                                    </div>
                                </div>
                            )}

                            {/* ── Regional Team ── */}
                            <div className="team-regional-section">
                                <div className="team-grid">
                                    {regionalTeam.map(m => <TeamCard key={m.id} member={m} />)}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="team-cta-section">
                <div className="container team-cta-inner">
                    <h2>Want to Join Our Team?</h2>
                    <p>We're always looking for driven individuals who share our passion for connectivity and innovation.</p>
                    <a
                        href="https://www.linkedin.com/in/rahima-ejaz-302939b1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Team;
