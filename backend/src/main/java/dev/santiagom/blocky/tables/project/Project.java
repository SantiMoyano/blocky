package dev.santiagom.blocky.tables.project;

import dev.santiagom.blocky.tables.screenshot.Screenshot;
import dev.santiagom.blocky.tables.tech.Tech;
import dev.santiagom.blocky.tables.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int progress;
    private String description;
    private String goal;

    // User relationship
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Screenshot relationship
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Screenshot> screenshots;

    // Tech relationship
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Tech> tech;
}
