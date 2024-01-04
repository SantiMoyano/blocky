package dev.santiagom.blocky.tables.project;

import dev.santiagom.blocky.tables.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
